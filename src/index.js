console.log('Loading...');
import getFlags from './options.js';
import * as utils from './utils';
import chalk from 'chalk';
import {
    Video,
    Logger
} from 'nmmes-backend';
import requireg from 'requireg';
import Path from 'path';
import fs from 'fs';

// Make sure log level is at default info
// Logger.setLevel('info');

let STOPREQ = false;

process.on('SIGINT', () => STOPREQ = true);

(async() => {
    let options = await getFlags();

    if (options.debug)
        Logger.setLevel('trace');

    Logger.trace('Options:', options);

    let moduleClasses = {
        'nmmes-module-encoder': require('nmmes-module-encoder')
    };

    if (options.heAudio)
        moduleClasses['nmmes-module-he-audio'] = require('nmmes-module-he-audio');
    if (options.normalize)
        moduleClasses['nmmes-module-normalize'] = require('nmmes-module-normalize');
    if (options.sample)
        moduleClasses['nmmes-module-sample'] = require('nmmes-module-sample');
    if (options.autocrop)
        moduleClasses['nmmes-module-autocrop'] = require('nmmes-module-autocrop');

    try {
        Object.assign(moduleClasses, options.modules.reduce((modules, name) => {
            const descriptor = `nmmes-module-${name}`;
            let module;
            try {
                module = requireg(descriptor);
            } catch (e) {
                Logger.debug(e);
                throw new Error(`Module ${descriptor} (${name}) was not found. Make sure ${descriptor} is installed.`);
            }

            modules[descriptor] = module;
            return modules;
        }, {}));
    } catch (e) {
        Logger.error(e);
        return 1;
    }

    Logger.debug(`Modules loaded: [${Object.keys(moduleClasses).join()}].`);

    let videos = (await utils.getPaths(options._[0])).reduce((arr, path) => {
        arr.push(new Video({
            input: {
                path
            },
            output: {
                path: Path.resolve(options.tempDirectory, Path.basename(path, Path.extname(path)) + '.' + options.outputFormat)
            },
            modules: Object.entries(moduleClasses).map(modulePair => {
                let name = modulePair[0];
                let moduleClass = modulePair[1];

                return new moduleClass(options.moduleOptions);
            })
        }));
        return arr;
    }, []);

    if (videos.length > 1)
        Logger.info('Videos found:\n\t-', videos.map((vid) => {
            return chalk.yellow(Path.relative(options._[0], vid.input.path));
        }).join('\n\t- '));

    for (let v of videos) {
        try {
            await v.run();
        } catch (e) {
            Logger.error(e);
            if (STOPREQ) {
                Logger.warn('Stopping because SIGINT receieved.');
                break;
            }
        }
        if (fs.existsSync(v.output.path)) {
            let destination = Path.resolve(options.destination, Path.basename(v.output.path));
            Logger.debug(`Moving ${chalk.bold(v.output.path)} -> ${chalk.bold(destination)}.`);
        }
    }

    Logger.info('Processing finished.');
})();

// getFlags(Options => {
//     // Set log level to trace if debug is enabled
//     if (Options.debug)
//         Logger.setLevel('trace');
//
//     let screen, videos = [],
//         killRequestCounter = 0;
//
//     Logger.stream = new PassThrough();
//
//     // Initialize user interface
//     if (!Options.simple) {
//         screen = new Screen();
//         screen.logStream = Logger.stream;
//         // console.oldLog = console.log;
//         // console.oldError = console.error;
//         console.log = function() {
//             // console.oldLog.apply(console, arguments);
//             Logger.log.apply(Logger, arguments);
//         }
//         console.error = function() {
//             // console.oldError.apply(console, arguments);
//             Logger.error.apply(Logger, arguments);
//         }
//
//         screen.key(['escape', 'q', 'C-c'], function() {
//             if (++killRequestCounter > 2) {
//                 Logger.error('Kill signal receieved more than 2 times, forcing process death... DIE ALREADY!');
//                 screen.destroy();
//                 process.kill(-process.pid, 'SIGKILL');
//             }
//             let videoWasRunning = false;
//             for (let video of videos) {
//                 if (video.running) {
//                     video.stop(new Error('STOPREQ: Video stopped by request of user.'));
//                     videoWasRunning = true;
//                 }
//             }
//
//             if (!videoWasRunning) {
//                 Logger.trace('Stop command receieved... Attempting to stop.');
//                 process.kill(-process.pid, 'SIGTERM');
//             }
//         });
//     }
//
//     if (typeof Options.logFile !== 'undefined') {
//         const logLocation = Path.resolve(Options.logFile, Package.name + '.log');
//         const fileLogStream = fs.createWriteStream(logLocation, {
//             flags: 'a'
//         });
//         Logger.stream.on('data', (buffer) => {
//             fileLogStream.write(stripAnsi(buffer.toString('utf8').trim()) + '\n');
//         });
//         Logger.log(`Logging output to ${logLocation}.`);
//     }
//
//     const heAudio = require('nmmes-module-he-audio');
//     const encoder = require('nmmes-module-encoder');
//     const normalizer = require('nmmes-module-normalize');
//     const autocrop = require('nmmes-module-autocrop');
//     const stats = require('nmmes-module-stats');
//     const sample = require('nmmes-module-sample');
//
//     // Logger.info(Options)
//     if (Options.watch) {
//         Logger.info('Watching directory ', chalk.bold(Options.watch) + '.');
//         Logger.error('Watch not implemented yet.');
//     } else {
//         Logger.info('Locating video file(s) at', chalk.bold(Options._[0]) + '.');
//         utils.getVideoFiles(Options._[0])
//             .then(createVideos)
//             .then(createVideoList)
//             .then((list) => {
//                 if (screen)
//                     screen.videoList = list;
//             })
//             .then(loop)
//             .then(() => {
//                 Logger.info('All videos completed processing!');
//             })
//             .catch((err) => {
//                 Logger.error(err.message);
//                 Logger.debug(err);
//             })
//             .then(() => {
//                 if (screen)
//                     screen.statusFinished();
//             });
//     }
//
//     function createVideos(paths) {
//         return new Promise(function(resolve, reject) {
//             Logger.debug(`Videos found [${paths.length}]:\n\t-`, paths.join('\n\t-'));
//             for (let path of paths) {
//
//                 let modules = [];
//                 if (Options.normalizeLevel >= 1) {
//                     modules.push(new autocrop());
//                 }
//                 if (Options.normalizeLevel >= 2) {
//                     modules.push(new normalizer(Options.moduleOptions['nmmes-module-normalize']));
//                 }
//
//                 // HE Audio
//                 if (Options.heAudio) {
//                     modules.push(new heAudio(Options.moduleOptions['nmmes-module-he-audio']));
//                 }
//
//                 // Encoder
//                 modules.push(new encoder(Options.moduleOptions['nmmes-module-encoder']));
//
//                 if (Options.stats)
//                     modules.push(new stats());
//
//                 // Sample
//                 if (Options.sample) {
//                     modules.push(new sample(Options.moduleOptions['nmmes-module-sample']));
//                 }
//
//                 if (Options.screenshots) {
//
//                 }
//
//                 let tempOutput = Path.format({
//                     dir: Options.tempDirectory,
//                     name: Path.parse(path).name,
//                     ext: '.' + Options.outputFormat
//                 });
//                 let finalOutput = Path.format({
//                     dir: Path.resolve(Options.destination, Path.dirname(Path.relative(Options._[0], path))),
//                     name: Path.parse(path).name,
//                     ext: '.' + Options.outputFormat
//                 });
//                 if (!Options.delete)
//                     if (fs.existsSync(finalOutput)) {
//                         Logger.warn('Output for', chalk.bold(Path.basename(path)), 'already exists at', chalk.bold(finalOutput) + '. Skipping...');
//                         continue;
//                     }
//                 videos.push(new Video({
//                     input: {
//                         path
//                     },
//                     output: {
//                         path: tempOutput
//                     },
//                     modules
//                 }));
//             }
//             resolve(videos);
//         });
//     }
//
//     function createVideoList(videos) {
//         return new Promise(function(resolve, reject) {
//             let items = videos.reduce((arr, video) => {
//                 let list = new List(video.modules.reduce((arr, module) => {
//                     let item = new Item({
//                         title: module.displayName
//                     });
//                     module.once('start', () => item.state = 'active');
//                     module.on('statusUpdate', status => item.status = status);
//                     module.once('stop', (err) => {
//                         module.removeListener('statusUpdate', status => item.status = status);
//                         if (err) {
//                             item.state = 'failed';
//                             item.error = err.message.split('\n')[0];
//                         } else {
//                             item.state = 'completed';
//                         }
//                     });
//                     arr.push(item);
//                     return arr;
//                 }, []));
//                 let item = new Item({
//                     title: video.input.base,
//                     content: list
//                 });
//                 video.once('start', () => {
//                     item.state = 'active';
//                 });
//                 video.once('stopped', (err) => {
//                     if (err) {
//                         item.state = 'failed';
//                         item.error = err.message.split('\n')[0];
//                     } else {
//                         let finalOutput = Path.format({
//                             dir: Path.resolve(Options.destination, Path.dirname(Path.relative(Options._[0], video.input.path))),
//                             name: Path.parse(video.input.path).name,
//                             ext: '.' + Options.outputFormat
//                         });
//                         Logger.info('Moving to final destination...', chalk.bold(finalOutput));
//                         fs.move(video.output.path, finalOutput, {
//                                 overwrite: Options.delete
//                             }).then(() => {
//                                 Logger.info('Move complete.');
//                                 item.state = 'completed';
//                             })
//                             .catch((err) => {
//                                 item.state = 'failed';
//                                 item.error = err.message;
//                             });
//                     }
//                 });
//                 video.on('module-stop', (module, err) => {
//                     if (module.tolerance !== 'required' && err) {
//                         item.state = 'warn';
//                     }
//                 });
//                 arr.push(item);
//                 return arr;
//             }, []);
//
//             resolve(new List(items));
//         });
//     }
//
//     function loop(i = 0) {
//         return new Promise(function(resolve, reject) {
//
//             if (i >= videos.length)
//                 return resolve();
//
//             videos[i].once('stopped', (err) => {
//                 if (err && err.message.startsWith('STOPREQ')) return reject(err);
//                 loop(++i).then(resolve, reject);
//             }).start();
//
//             screen.statusRunning();
//         });
//     }
// });
