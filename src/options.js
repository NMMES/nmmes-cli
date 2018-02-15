import Path from 'path';
import os from 'os';
import Package from '../package.json';
import yargs from 'yargs';
import gitVer from 'git-rev-sync';
import fs from 'fs-extra';
import requireg from 'requireg';
import chalk from 'chalk';
import bluebird from 'bluebird';
import npmi from 'npmi';
const npmip = bluebird.promisify(npmi);
import {
    Module,
    Logger
} from 'nmmes-backend';

const cliSpecificOptions = {
    'version': {
        describe: 'Displays version information.',
        group: 'General:',
        type: 'boolean',
        default: false
    },
    'help': {
        describe: 'Displays help page.',
        group: 'General:',
        type: 'boolean',
        default: false
    },
    'log-file': {
        default: '',
        describe: 'Sets the log file location for all output from h265ize.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'profile': {
        default: 'none',
        describe: 'Url or name of an encoding preset.',
        type: 'string',
        group: 'General:'
    },
    'g': {
        alias: 'temp-directory',
        default: Path.resolve(os.tmpdir(), Package.name),
        describe: 'Folder where files are stored during encoding.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'd': {
        alias: 'destination',
        default: Path.resolve(process.cwd(), 'nmmes-out'),
        describe: 'Folder where encoded files are output.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'debug': {
        default: false,
        describe: 'Enables debug mode. Prints extra debugging information.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'delete': {
        default: false,
        describe: 'Delete source after encoding is complete and replaces it with new encode. [DANGER]',
        type: 'boolean',
        group: 'Advanced:'
    },
    'modules': {
        describe: 'List of modules to enable',
        group: 'General:',
        type: 'array',
        default: ['encoder', 'he-audio', 'sample', 'normalize']
    },
    'f': {
        alias: 'output-format',
        default: 'mkv',
        describe: 'Output container format.',
        choices: ['mkv', 'mp4', 'm4v'],
        type: 'string',
        group: 'General:'
    },
    's': {
        alias: 'skip-video-codec',
        default: [],
        describe: 'Skips videos already encoded with a specific video codecs.',
        type: 'array',
        group: 'General:'
    },
    'watch': {
        default: false,
        describe: 'Watches a directory for new video files to be converted.',
        type: 'boolean',
        group: 'Advanced:'
    },
};

export function getVersion() {
    try {
        if (fs.existsSync('node_modules')) {
            let path = Path.resolve(fs.realpathSync('node_modules'), '../');
            let version = gitVer.branch(path) + '#' + gitVer.short(path);
            return {
                version: Package.version,
                formatted: `(Development Build) ${version}`
            };
        }
    } catch (e) {
        return {
            version: Package.version,
            formatted: Package.version
        };
    }
}

export default async function load() {
    let cliArgs = yargs
        .version(false)
        .help(false)
        .usage('Usage: $0 [options] file|directory')
        .options(cliSpecificOptions).argv;

    if (cliArgs.debug) {
        Logger.setLevel('trace');
    }

    let modules = await loadModules(cliArgs.modules);
    let options = await extractModuleOptions(modules);

    Object.assign(options, cliSpecificOptions);

    if (cliArgs.profile) {
        let profile = await getProfile(cliArgs.profile);

        // QUESTION: Why doesn't Object.entries(profile.options) work when profile.options = {}?
        for (let [key, value] of Object.entries(profile.options || {})) {
            if (!options[key]) {
                Logger.warn(`Option ${key} is not associated with an activated module.`);
                continue;
            }
            options[key].default = value;
            options[key].defaultSetBy = 'profile';
        }
    }

    let moduleArgs = yargs
        .version(false)
        .help(false)
        .usage('Usage: $0 [options] file|directory')
        .options(options).argv;

    if (moduleArgs.version) {
        console.log(`${Package.name} ${getVersion().formatted}`);
        process.exit();
    } else if (moduleArgs.help || (moduleArgs._.length < 1 && !moduleArgs.watch)) {
        console.log('Package:', Package.name, '\t', 'Version:', getVersion().formatted);
        console.log('Description:', Package.description);
        yargs.showHelp();
        process.exit();
    }

    return {
        args: moduleArgs,
        modules
    };
}

async function loadModules(modules) {
    let loadedModules = {};

    for (let module of modules) {
        let mName = `nmmes-module-${module}`;
        loadedModules[module] = await requireModule(mName);
    }
    return loadedModules;
}

const moduleDir = './external-modules';
async function requireModule(name) {
    const path = Path.resolve(Path.join(moduleDir, 'node_modules', name));
    try {
        let mod = requireg(path);
        Logger.trace(`Able to load module ${name} on first attempt.`);
        return mod;
    } catch (e) {
        Logger.trace(`Unable to require ${name}:`, e);
        Logger.trace(`Attempting to link ${name}.`);
        if (process.env.NODE_ENV === 'development' && await linkModule(name, moduleDir)) {
            Logger.trace(`Module linked!`);
            return requireg(path);
        }
        Logger.info(`Attempting to install ${name}.`);
        await npmip({
            path: moduleDir,
            name: `${name}@${Module.MODULE_VERSION}`
        });
        return requireg(path);
    }
}

async function linkModule(name, moduleDir) {
    const linkPath = Path.join(os.homedir(), '.config/yarn/link', name);
    if (await fs.pathExists(linkPath)) {
        await fs.ensureDir(Path.join(moduleDir, 'node_modules'));
        await fs.symlink(linkPath, Path.join(moduleDir, 'node_modules', name));
        return true;
    }
    return false;
}

async function extractModuleOptions(modules) {
    let options = {};
    for (let [mName, mod] of Object.entries(modules)) {
        let ops = mod.options();
        for (let name of Object.keys(ops)) {
            Object.defineProperty(ops, `${mName}-${name}`,
                Object.getOwnPropertyDescriptor(ops, name));
            delete ops[name];
        }
        Object.assign(options, ops);
    }
    return options;
}


import isUrl from 'is-url';
import rp from 'request-promise-native';

export function localProfiles() {
    let profiles = require.context('./profiles/', true, /\.json$/).keys();
    for (let idx in profiles) {
        profiles[idx] = Path.basename(profiles[idx], '.json');
    }
    return profiles;
}

async function getProfile(profileLocation) {
    if (profileLocation === 'none')
        return {};

    if (~localProfiles().indexOf(profileLocation)) {
        Logger.debug(`Built in profile "${profileLocation}" found!`);
        let profile = require('./profiles/' + profileLocation + '.json');
        return profile;
    }

    if (isUrl(profileLocation))
        try {
            return await rp({
                uri: profileLocation,
                json: true
            });
        } catch (e) {
            throw new Error(`Error retreiving profile: ${e.message}`);
        }

    if (fs.existsSync(profileLocation)) {
        return fs.readFile(profileLocation, (err, data) => {
            if (err)
                throw err;
            return JSON.parse(data);
        });
    }

    Logger.info('Availiable local profiles are: [', chalk.bold(localProfiles().join(', ')), ']');
    Logger.info(`You may activate a profile via it's local name or a url to a profile json file.`);
    Logger.info(`Examples:
\t${Package.name} --profile anime my/movies/folder
\t${Package.name} --profile https://raw.githubusercontent.com/NMMES/nmmes-cli/master/src/profiles/anime.json`)
    throw new Error(`Profile ${profileLocation} not found.`);
}

// const options = {
//     'g': {
//         alias: 'temp-directory',
//         default: Path.resolve(os.tmpdir(), Package.name),
//         describe: 'Folder where files are stored during encoding.',
//         type: 'string',
//         normalize: true,
//         group: 'General:'
//     },
//
//     'log-file': {
//         default: '',
//         describe: 'Sets the log file location for all output from h265ize.',
//         type: 'string',
//         normalize: true,
//         group: 'General:'
//     },
//     // 'x': {
//     //     alias: 'extra-options',
//     //     default: '',
//     //     describe: 'Options provided directly to the encoder.',
//     //     type: 'string',
//     //     group: 'Advanced:'
//     // },
//     // 'video-bitrate': {
//     //     default: 0,
//     //     describe: 'Sets the video bitrate, set to 0 to use qp rate control instead of a target bitrate.',
//     //     type: 'number',
//     //     group: 'Video:'
//     // },
//     // 'accurate-timestamps': {
//     //     default: false,
//     //     describe: 'Become blu-ray complient and reduce the max keyInt to the average frame rate.',
//     //     type: 'boolean',
//     //     group: 'Video:'
//     // },
//     // 'multi-pass': {
//     //     default: 0,
//     //     describe: 'Enable multiple passes by the encoder. Must be greater than 1.',
//     //     type: 'number',
//     //     group: 'Video:'
//     // },
//     'screenshots': {
//         default: 0,
//         describe: 'Take n screenshots at regular intervals throughout the finished encode.',
//         type: 'number',
//         group: 'Video:'
//     },
//     'normalize-level': {
//         default: 2,
//         describe: 'Level of normalization to be applied. See https://github.com/FallingSnow/h265ize/issues/56 for more info.',
//         type: 'number',
//         group: 'Video:'
//     },
//     'stats': {
//         default: false,
//         describe: 'Output a stats file containing stats to this destination.',
//         type: 'string',
//         group: 'Advanced:'
//     },
// };
// let args = yargs
//     .version(false)
//     .help(false)
//     .usage('Usage: $0 [options] file|directory')
//     .options(options).argv;
//
// const yargAliases = yargs.choices().parsed.aliases;
//
//
// function explicitFlags() {
//     let flags = {};
//     for (let option of Object.keys(args)) {
//         if (userSetOption(option, false)) flags[option] = args[option];
//     }
//     return flags;
// }
//
// export function userSetOption(option, aliases = true) {
//     function searchForOption(option) {
//         return ~process.argv.indexOf(option);
//     }
//
//     if (searchForOption(`-${option}`) || searchForOption(`--${option}`))
//         return true;
//
//     // Handle aliases for same option
//     if (aliases)
//         for (let aliasIndex in yargAliases[option]) {
//             let alias = yargAliases[option][aliasIndex];
//             if (searchForOption(`-${alias}`) || searchForOption(`--${alias}`))
//                 return true;
//         }
//
//     return false;
// }
//
// function flagsToModuleOptions(flags) {
//     let moduleOptions = {
//         'nmmes-module-encoder': {
//             defaults: {
//                 video: {
//                     vf: []
//                 }
//             }
//         },
//         'nmmes-module-normalize': {},
//         'nmmes-module-he-audio': {},
//         'nmmes-module-sample': {},
//     };
//     if (flags.videoCodec) moduleOptions['nmmes-module-encoder'].defaults.video['c:{POS}'] = flags.videoCodec;
//     if (flags.bitdepth) {
//         if (flags.bitdepth === 8) {
//             moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p';
//         } else if (flags.bitdepth === 10) {
//             moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p10le';
//         } else if (flags.bitdepth === 12) {
//             moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p12le';
//         }
//     }
//     if (flags.scale) moduleOptions['nmmes-module-encoder'].defaults.video.vf.push(`scale=${flags.scale}:-2`);
//     if (flags.preset) moduleOptions['nmmes-module-encoder'].defaults.video.preset = flags.preset;
//     if (flags.quality) moduleOptions['nmmes-module-encoder'].defaults.video.crf = flags.quality;
//     if (flags.preview) {
//         moduleOptions['nmmes-module-encoder'].defaults.video.t = flags.previewLength / 1000;
//     }
//     if (flags.nativeLangage) moduleOptions['nmmes-module-normalize'].language = flags.nativeLangage;
//     if (flags.forceHeAudio) moduleOptions['nmmes-module-he-audio'].force = flags.forceHeAudio;
//     if (flags.downmixHeAudio) moduleOptions['nmmes-module-he-audio'].downmix = flags.downmixHeAudio;
//     if (flags.previewLength) moduleOptions['nmmes-module-sample'].length = flags.previewLength;
//
//     return moduleOptions;
// }
//
// function applyAliases(flags) {
//     for (let flag of Object.keys(flags)) {
//         for (let aliasIndex in yargAliases[flag]) {
//             let alias = yargAliases[flag][aliasIndex];
//             flags[alias] = flags[flag];
//         }
//     }
//     return flags;
// }
//
// export default async function flags() {
//     const profile = await getProfile(args.profile);
//     let options = Object.assign(args, applyAliases(profile), applyAliases(explicitFlags()));
//     merge(options, {
//         moduleOptions: flagsToModuleOptions(options)
//     });
//     return options;
// }
//
// Logger.trace('Options parser loaded.');
