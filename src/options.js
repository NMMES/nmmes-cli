import Path from 'path';
import os from 'os';
import Package from '../package.json';
import yargs from 'yargs';
import gitVer from 'git-rev-sync';
import fs from 'fs';
import heAudio from 'nmmes-module-he-audio';
import sample from 'nmmes-module-sample';
import normalizer from 'nmmes-module-normalize';
import encoder from 'nmmes-module-encoder';
import {
    getProfile
} from './utils';
import {
    merge
} from 'lodash';
import {
    Logger
} from 'nmmes-backend';

const options = {
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
    'skip': {
        describe: 'Skips videos already encoded with a specific codec.',
        type: 'string',
        group: 'General:'
    },
    'p': {
        alias: 'preview',
        default: false,
        describe: 'Only encode a preview of the video starting at middle of video. See -l/--preview-length for more info.',
        type: 'boolean',
        group: 'General:'
    },
    'log-file': {
        default: '',
        describe: 'Sets the log file location for all output from h265ize.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'm': {
        alias: 'preset',
        default: 'fast',
        describe: 'x265 encoder preset.',
        choices: ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow', 'placebo'],
        type: 'string',
        group: 'General:'
    },
    'n': {
        alias: 'native-language',
        default: normalizer.defaults().language,
        describe: 'The native language used to select default audio and subtitles. You may use 3 letter or 2 letter ISO 639-2 Alpha-3/Alpha-2 codes or the full language name. Examples: [eng|en|English|jpn|ja|Japanese]',
        type: 'string',
        group: 'General:'
    },
    'f': {
        alias: 'output-format',
        default: 'mkv',
        describe: 'Output container format.',
        choices: ['mkv', 'mp4', 'm4v'],
        type: 'string',
        group: 'General:'
    },
    'c': {
        alias: 'video-codec',
        default: encoder.defaults().defaults.video['c:{POS}'],
        describe: 'Video codec to encode the video to.',
        choices: ['libx264', 'libx265'],
        type: 'string',
        group: 'Video:'
    },
    'profile': {
        default: 'none',
        describe: 'My personal presets. Descriptions of each preset\'s use and function can be found on the github wiki.',
        type: 'string',
        group: 'Video:'
    },
    // 'x': {
    //     alias: 'extra-options',
    //     default: '',
    //     describe: 'Options provided directly to the encoder.',
    //     type: 'string',
    //     group: 'Advanced:'
    // },
    'q': {
        alias: 'quality',
        default: 19,
        describe: 'Sets the qp quality target',
        type: 'number',
        group: 'Video:'
    },
    // 'video-bitrate': {
    //     default: 0,
    //     describe: 'Sets the video bitrate, set to 0 to use qp rate control instead of a target bitrate.',
    //     type: 'number',
    //     group: 'Video:'
    // },
    // 'accurate-timestamps': {
    //     default: false,
    //     describe: 'Become blu-ray complient and reduce the max keyInt to the average frame rate.',
    //     type: 'boolean',
    //     group: 'Video:'
    // },
    'he-audio': {
        default: false,
        describe: `Re-encode audio to opus at ${heAudio.defaults().bitratePerChannel}kbps/channel.`,
        type: 'boolean',
        group: 'Audio:'
    },
    'force-he-audio': {
        default: heAudio.defaults().encodeLossless,
        describe: 'Convert all audio to HE format, including lossless formats. Enables he-audio.',
        type: 'boolean',
        group: 'Audio:'
    },
    'downmix-he-audio': {
        default: heAudio.defaults().downmix,
        describe: `Downmix he-audio opus to Dolby Pro Logic II at ${heAudio.defaults().bitratePerChannel}kbps/channel. Enables he-audio.`,
        type: 'boolean',
        group: 'Audio:'
    },
    // 'multi-pass': {
    //     default: 0,
    //     describe: 'Enable multiple passes by the encoder. Must be greater than 1.',
    //     type: 'number',
    //     group: 'Video:'
    // },
    'bitdepth': {
        default: 0,
        describe: 'Forces encoding videos at a specific bitdepth. Set to 0 to maintain original bitdepth.',
        type: 'number',
        group: 'Video:'
    },
    'screenshots': {
        default: 0,
        describe: 'Take n screenshots at regular intervals throughout the finished encode.',
        type: 'number',
        group: 'Video:'
    },
    'normalize-level': {
        default: 2,
        describe: 'Level of normalization to be applied. See https://github.com/FallingSnow/h265ize/issues/56 for more info.',
        type: 'number',
        group: 'Video:'
    },
    'scale': {
        default: 0,
        describe: 'Width videos should be scaled to. Videos will always maintain original aspect ratio. [Examples: 720, 480]',
        type: 'number',
        group: 'Video:'
    },
    'stats': {
        default: false,
        describe: 'Output a stats file containing stats to this destination.',
        type: 'string',
        group: 'Advanced:'
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
    'l': {
        alias: 'preview-length',
        default: sample.defaults().length,
        describe: 'Milliseconds to encode in preview mode. Max is half the length of input video.',
        type: 'number',
        group: 'Advanced:'
    },
    // 'watch': {
    //     default: '',
    //     describe: 'Watches a directory for new video files to be converted.',
    //     type: 'string',
    //     group: 'Advanced:'
    // },
    'simple': {
        default: false,
        describe: 'Disables the interface. Simply prints to the terminal.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'modules': {
        default: [],
        describe: 'A list of modules to import.',
        type: 'array',
        group: 'Advanced:'
    },
    'test': {
        default: false,
        describe: 'Puts nmmes in test mode. No files will be encoded.',
        type: 'boolean',
        group: 'Advanced:'
    },
};
let args = yargs
    .version(false)
    .help(false)
    .usage('Usage: $0 [options] file|directory')
    .options(options).argv;

const yargAliases = yargs.choices().parsed.aliases;


if (args.version) {
    try {
        if (fs.existsSync('node_modules')) {
            let path = Path.resolve(fs.realpathSync('node_modules'), '../');
            console.log(Package.name, '(Development Build)', gitVer.branch(path) + '#' + gitVer.short(path));
        }
    } catch (e) {
        console.log(e);
        console.log(Package.name, Package.version);
    }
    process.exit();
} else if (args.help || (args._.length < 1 && !args.watch)) {
    console.log('Package:', Package.name, '\t', 'Version:', Package.version);
    console.log('Description:', Package.description);
    yargs.showHelp();
    process.exit();
}

function explicitFlags() {
    let flags = {};
    for (let option of Object.keys(args)) {
        if (userSetOption(option, false)) flags[option] = args[option];
    }
    return flags;
}

export function userSetOption(option, aliases = true) {
    function searchForOption(option) {
        return ~process.argv.indexOf(option);
    }

    if (searchForOption(`-${option}`) || searchForOption(`--${option}`))
        return true;

    // Handle aliases for same option
    if (aliases)
        for (let aliasIndex in yargAliases[option]) {
            let alias = yargAliases[option][aliasIndex];
            if (searchForOption(`-${alias}`) || searchForOption(`--${alias}`))
                return true;
        }

    return false;
}

function flagsToModuleOptions(flags) {
    let moduleOptions = {
        'nmmes-module-encoder': {
            defaults: {
                video: {
                    vf: []
                }
            }
        },
        'nmmes-module-normalize': {},
        'nmmes-module-he-audio': {},
        'nmmes-module-sample': {},
    };
    if (flags.videoCodec) moduleOptions['nmmes-module-encoder'].defaults.video['c:{POS}'] = flags.videoCodec;
    if (flags.bitdepth) {
        if (flags.bitdepth === 8) {
            moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p';
        } else if (flags.bitdepth === 10) {
            moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p10le';
        } else if (flags.bitdepth === 12) {
            moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p12le';
        }
    }
    if (flags.scale) moduleOptions['nmmes-module-encoder'].defaults.video.vf.push(`scale=${flags.scale}:-2`);
    if (flags.preset) moduleOptions['nmmes-module-encoder'].defaults.video.preset = flags.preset;
    if (flags.quality) moduleOptions['nmmes-module-encoder'].defaults.video.crf = flags.quality;
    if (flags.preview) {
        moduleOptions['nmmes-module-encoder'].defaults.video.t = flags.previewLength / 1000;
    }
    if (flags.nativeLangage) moduleOptions['nmmes-module-normalize'].language = flags.nativeLangage;
    if (flags.forceHeAudio) moduleOptions['nmmes-module-he-audio'].force = flags.forceHeAudio;
    if (flags.downmixHeAudio) moduleOptions['nmmes-module-he-audio'].downmix = flags.downmixHeAudio;
    if (flags.previewLength) moduleOptions['nmmes-module-sample'].length = flags.previewLength;

    return moduleOptions;
}

function applyAliases(flags) {
    for (let flag of Object.keys(flags)) {
        for (let aliasIndex in yargAliases[flag]) {
            let alias = yargAliases[flag][aliasIndex];
            flags[alias] = flags[flag];
        }
    }
    return flags;
}

export default async function flags() {
    const profile = await getProfile(args.profile);
    let options = Object.assign(args, applyAliases(profile), applyAliases(explicitFlags()));
    merge(options, {
        moduleOptions: flagsToModuleOptions(options)
    });
    return options;
}

Logger.trace('Options parser loaded.');
