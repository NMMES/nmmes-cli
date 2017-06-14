import Path from 'path';
import os from 'os';
import Package from '../package.json';
import yargs from 'yargs';
import optional from 'optional';

const userSettings = optional(Path.resolve(process.cwd(), Package.name + '-settings.json')) || {};

let args = yargs
    .usage('Usage: $0 [options] file|directory')
    .options({
    'version': {
        describe: 'Displays version information.',
        group: 'General:'
    },
    'help': {
        describe: 'Displays help page.',
        group: 'General:'
    },
        'd': {
            alias: 'destination',
            default: userSettings['destination'] || Path.resolve(process.cwd(), 'h265'),
            describe: 'Folder where encoded files are output.',
            type: 'string',
            normalize: true,
            group: 'General:'
        },
        // 'log-file': {
        //     default: userSettings['log-file'] || Path.resolve(process.cwd(), 'h265ize.log'),
        //     describe: 'Sets the log file location for all output from h265ize. Enable debug mode via the --debug flag to output to the log file.',
        //     type: 'string',
        //     normalize: true,
        //     group: 'General:'
        // },
        'm': {
            alias: 'preset',
            default: userSettings['preset'] || 'fast',
            describe: 'x265 encoder preset.',
            choices: ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow', 'placebo'],
            type: 'string',
            group: 'General:'
        },
        'as-preset': {
            default: userSettings['as-preset'] || 'none',
            describe: 'My personal presets. Descriptions of each preset\'s use and function can be found on the github page.',
            choices: ['anime', 'testing-ssim', 'none'],
            type: 'string',
            group: 'Video:'
        },
        'n': {
            alias: 'native-language',
            default: userSettings['native-language'] || '',
            describe: 'The native language used to select default audio and subtitles. You may use 3 letter or 2 letter ISO 639-2 Alpha-3/Alpha-2 codes or the full language name. Examples: [eng|en|English|jpn|ja|Japanese]',
            type: 'string',
            group: 'General:'
        },
        'f': {
            alias: 'output-format',
            default: userSettings['output-format'] || 'mkv',
            describe: 'Output container format.',
            choices: ['mkv', 'mp4', 'm4v'],
            type: 'string',
            group: 'General:'
        },
        'x': {
            alias: 'extra-options',
            default: userSettings['extra-options'] || '',
            describe: 'Extra x265 options. Options can be found on the x265 options page.',
            type: 'string',
            group: 'Video:'
        },
        'q': {
            alias: 'quality',
            default: userSettings['quality'] || 19,
            describe: 'Sets the qp quality target',
            type: 'number',
            group: 'General:'
        },
        'video-bitrate': {
            default: userSettings['video-bitrate'] || 0,
            describe: 'Sets the video bitrate, set to 0 to use qp rate control instead of a target bitrate.',
            type: 'number',
            group: 'Video:'
        },
        'l': {
            alias: 'preview-length',
            default: userSettings['preview-length'] || 30000,
            describe: 'Milliseconds to encode in preview mode. Max is half the length of input video.',
            type: 'number',
            group: 'Advanced:'
        },
        'accurate-timestamps': {
            default: userSettings['accurate-timestamps'] || false,
            describe: 'Become blu-ray complient and reduce the max keyInt to the average frame rate.',
            type: 'boolean',
            group: 'Video:'
        },
        'he-audio': {
            default: userSettings['he-audio'] || false,
            describe: 'Re-encode audio to opus at 40kbps/channel.',
            type: 'boolean',
            group: 'Audio:'
        },
        'force-he-audio': {
            default: userSettings['force-he-audio'] || false,
            describe: 'Convert all audio to HE format, including lossless formats.',
            type: 'boolean',
            group: 'Audio:'
        },
        'downmix-he-audio': {
            default: userSettings['downmix-he-audio'] || false,
            describe: 'Downmix he-audio opus to Dolby Pro Logic II at 40 kbps/channel. Enables he-audio.',
            type: 'boolean',
            group: 'Audio:'
        },
        'o': {
            alias: 'overwrite',
            default: userSettings['override'] || false,
            describe: 'Allows conversion of videos that are already encoded by the hevc codec.',
            type: 'boolean',
            group: 'General:'
        },
        'p': {
            alias: 'preview',
            default: userSettings['preview'] || false,
            describe: 'Only encode a preview of the video starting at middle of video. See -l/--preview-length for more info.',
            type: 'boolean',
            group: 'General:'
        },
        'multi-pass': {
            default: userSettings['mutli-pass'] || 0,
            describe: 'Enable multiple passes by the encoder. Must be greater than 1.',
            type: 'number',
            group: 'Video:'
        },
        'stats': {
            default: userSettings['stats'] || false,
            describe: 'Output a stats file containing stats for each video converted.',
            type: 'boolean',
            group: 'Advanced:'
        },
        'v': {
            alias: 'verbose',
            default: userSettings['verbose'] || false,
            describe: 'Enables verbose mode. Prints extra information.',
            type: 'boolean',
            group: 'General:'
        },
        'watch': {
            default: userSettings['watch'] || '',
            describe: 'Watches a directory for new video files to be converted.',
            type: 'string',
            group: 'Advanced:'
        },
        'bitdepth': {
            default: userSettings['bitdepth'] || 0,
            describe: 'Forces encoding videos at a specific bitdepth. Set to 0 to maintain original bitdepth.',
            type: 'number',
            group: 'Video:'
        },
        'screenshots': {
            default: userSettings['screenshots'] || false,
            describe: 'Take 6 screenshots at regular intervals throughout the finished encode.',
            type: 'boolean',
            group: 'Video:'
        },
        'normalize-level': {
            default: userSettings['normalize-level'] || 2,
            describe: 'Level of normalization to be applied. See https://github.com/FallingSnow/h265ize/issues/56 for more info.',
            type: 'number',
            group: 'Advanced:'
        },
        'scale': {
            default: userSettings['scale'] || false,
            describe: 'Width videos should be scaled to. Videos will always maintain original aspect ratio. [Examples: 720, 480]',
            type: 'number',
            group: 'Video:'
        },
        'debug': {
            default: userSettings['debug'] || false,
            describe: 'Enables debug mode. Prints extra debugging information.',
            type: 'boolean',
            group: 'Advanced:'
        },
        'g': {
            alias: 'temp-directory',
            default: userSettings['temp-directory'] || Path.resolve(os.tmpdir(), Package.name),
            describe: 'Folder where files are stored during encoding.',
            type: 'string',
            normalize: true,
            group: 'General:'
        },
        'delete': {
            default: userSettings['delete'] || false,
            describe: 'Delete source after encoding is complete and replaces it with new encode. [DANGER]',
            type: 'boolean',
            group: 'Advanced:'
        },
        'simple': {
            default: userSettings['simple'] || false,
            describe: 'Disables the interface. Simply prints to the terminal.',
            type: 'boolean',
            group: 'Advanced:'
        },
        'test': {
            default: userSettings['test'] || false,
            describe: 'Puts h265ize in test mode. No files will be encoded.',
            type: 'boolean',
            group: 'Advanced:'
        },
    })
    .argv;

if (args.help) {
    console.log('Package:', Package.name, '\t', 'Version:', Package.version);
    console.log('Description:', Package.description);
    yargs.showHelp();
    process.exit(0);
} else if (args.version) {
    console.log(Package.name, Package.version);
    process.exit(0);
}

export default args;
