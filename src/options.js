import Path from 'path';
import os from 'os';
import Package from '../package.json';
import yargs from 'yargs';
import gitVer from 'git-rev-sync';
import fs from 'fs-extra';
import requireg from 'requireg';
import chalk from 'chalk';
import sudo from 'sudo-prompt';
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
    // 'log-file': {
    //     default: '',
    //     describe: 'Sets the log file location for all output from h265ize.',
    //     type: 'string',
    //     normalize: true,
    //     group: 'General:'
    // },
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
        describe: 'Enables debug logging. Prints extra debugging information.',
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
        describe: 'List of modules to enable.',
        group: 'General:',
        type: 'array',
        default: ['normalize', 'encoder']
    },
    'install-modules': {
        default: false,
        describe: 'Globally installs missing modules. Will prompt for admin permission.',
        group: 'Advanced:',
        type: 'boolean',
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
    'rpc-port': {
        default: 0,
        describe: 'Port number to listen for tcp http commands on. Set to 0 to disable.',
        type: 'number',
        group: 'Remote:'
    },
    'rpc-bind': {
        default: 'localhost',
        describe: 'Unix interface to listen for tcp commands on.',
        type: 'string',
        group: 'Remote:'
    },
    'rpc-socket': {
        default: '',
        describe: 'Unix socket to listen for tcp commands on. Leave empty to disable.',
        type: 'string',
        group: 'Remote:'
    }
};

export function getVersion() {
    if (fs.existsSync('node_modules')) {
        try {
            let path = Path.resolve(fs.realpathSync('node_modules'), '../');
            let version = gitVer.branch(path) + '#' + gitVer.short(path);
            return `(Development Build) ${version}`;
        } catch (e) {
            Logger.trace(e);
        }
    }
    return Package.version;
}

export default async function load() {
    let initialArgs = yargs
        .version(false)
        .help(false)
        .options({
            profile: cliSpecificOptions.profile,
            debug: cliSpecificOptions.debug
        }).argv;

    if (initialArgs.debug) {
        Logger.level = 'trace';
    }

    let profile = await getProfile(initialArgs.profile);

    if (profile.depricated) {
        if (typeof profile.depricated === 'string') {
            Logger.warn(`[Profile: ${initialArgs.profile}]`, profile.depricated);
        } else {
            Logger.warn(`[Profile: ${initialArgs.profile}]`, "The use of this profile has been depricated, please use another profile.");
        }
    }

    if (profile.messages)
        for (const message of profile.messages) {
            Logger[message.level](`[Profile: ${initialArgs.profile}]`, message.text);
        }

    if (profile.options && profile.options.modules) {
        cliSpecificOptions.modules.default = profile.options.modules;
        cliSpecificOptions.modules.defaultSetBy = 'profile';
    }

    let moduleArgs = yargs
        .version(false)
        .help(false)
        .options({
            modules: cliSpecificOptions.modules,
            'install-modules': cliSpecificOptions['install-modules'] // Install modules
        }).argv;

    let modules = await loadModules(moduleArgs.modules, moduleArgs.i);
    let options = Object.assign({}, cliSpecificOptions, await extractModuleOptions(modules));

    for (let [key, value] of Object.entries(profile.options || {})) {
        if (!options[key]) {
            Logger.warn(`Option ${key} is not associated with an activated module.`);
            continue;
        }
        options[key].default = value;
        options[key].defaultSetBy = 'profile';
    }

    let args = yargs
        .version(false)
        .help(false)
        .strict()
        .usage('Usage: $0 file|directory [options]')
        .options(options).argv;


    if (args.version) {
        console.log(`${Package.name} ${getVersion()}\nModule Version: ${Module.MODULE_VERSION}`);
        process.exit();
    }

    if (args.help || (args._.length < 1 && !(args.rpcPort || args.rpcSocket))) {
        await Logger.flush();
        console.log('Package:', Package.name, '\t', 'Version:', getVersion());
        console.log('Description:', Package.description);
        yargs.showHelp();
        process.exit();
    }

    return {
        args,
        modules
    };
}

async function loadModules(modules, install) {
    let loadedModules = {};

    for (let module of modules) {
        let mName = `nmmes-module-${module}`;
        loadedModules[module] = await requireModule(mName, install);
    }
    return loadedModules;
}

async function requireModule(name, install = false) {
    try {
        let mod;
        try {
            mod = requireg(name);
        } catch (e) {
            if (~e.stack.indexOf('Caused By: AssertionError [ERR_ASSERTION]: missing path') && install)
                mod = await installModule(`${name}`);
            else
                throw e;
        }
        Logger.trace(`Loaded module ${name}.`);
        return mod;
    } catch (e) {
        Logger.trace(`Unable to require ${name}:`, e);
        throw new Error(`Could not load ${name}. Run again with the "--install-modules" flag or manual install it via "npm install --global ${name}".`);
    }
}

async function installModule(name) {
    const command = `npm install -g ${name}`;
    Logger.info(`Installing ${name}...`);
    Logger.trace(`Install Command: ${command}`);
    let res = await new Promise((resolve, reject) => {
        sudo.exec(command, {
                name: "Node Modular Media Encoding System CLI"
            },
            function(error, stdout, stderr) {
                if (error) return reject(error);
                return resolve({
                    stdout,
                    stderr
                });
            }
        );
    });
    Logger.trace(`Installed module ${name}:`, res.stdout);
    return requireg(name);
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

    if (require('is-url')(profileLocation)) {
        const fetch = require('node-fetch');
        try {
            return await (await fetch(profileLocation)).json();
        } catch (e) {
            throw new Error(`Error retreiving profile: ${e.message}`);
        }
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
// };
