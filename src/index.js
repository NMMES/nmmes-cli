import Promise from 'bluebird';
Promise.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: false,
    // Enable monitoring
    monitoring: false
});
import {
    Video,
    Logger
} from 'nmmes-backend';

import Package from '../package.json';
import Screen from './screen.js';
import {
    List,
    Item
} from './list.js';
import Options from './options.js';
import * as utils from './utils';

import chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs-extra';
import {
    PassThrough
} from 'stream';
import Path from 'path';

const heAudio = require('nmmes-module-he-audio');
const encoder = require('nmmes-module-encoder');
const normalizer = require('nmmes-module-normalize');
const autocrop = require('nmmes-module-autocrop');
const stats = require('nmmes-module-stats');
const sample = require('nmmes-module-sample');

let screen, videos = [],
    currentVideoIdx = 0;

if (!Options.simple) {
    screen = new Screen();
    screen.logStream = Logger.stream = new PassThrough();
    console.oldLog = console.log;
    console.oldError = console.error;
    console.log = function() {
        console.oldLog.apply(console, arguments);
        Logger.log.apply(Logger, arguments);
    }
    console.error = function() {
        console.oldError.apply(console, arguments);
        Logger.error.apply(Logger, arguments);
    }

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        if (++killCounter > 2) {
            Logger.error('Kill signal receieved more than 9 times, forcing process death... DIE ALREADY!');
            screen.destroy();
            process.kill(-process.pid, 'SIGKILL');
        }
        if (screen._status.content === 'Running...') {
            videos[currentVideoIdx].stop(new Error('Stopping.'));
            return;
        }

        process.kill(-process.pid, 'SIGTERM');
    });
}

function createVideos(paths) {
    return new Promise(function(resolve, reject) {
        Logger.debug(`Videos found [${paths.length}]:\n\t-`, paths.join('\n\t-'));
        for (let path of paths) {

            let modules = [];
            if (Options.normalizeLevel >= 1) {
                modules.push(new autocrop());
            }
            if (Options.normalizeLevel >= 2) {
                modules.push(new normalizer());
            }
            if (Options.heAudio) {
                modules.push(new heAudio({
                    encodeLossless: Options.forceHeAudio
                }));
            }
            modules.push(new encoder({
                defaults: {
                    video: {
                        'c:{POS}': Options.videoCodec,
                        'crf': Options.quality,
                        'preset': Options.preset
                    }
                }
            }));
            if (Options.stats) {
                if (Options.stats === true)
                    modules.push(new stats());
                else
                    modules.push(new stats({
                        output: Options.stats
                    }));
            }
            if (Options.sample) {
                modules.push(new sample({
                    length: Options.previewLength
                }));
            }

            let tempOutput = Path.format({
                dir: Options.tempDirectory,
                name: Path.parse(path).name,
                ext: '.' + Options.outputFormat
            });
            let finalOutput = Path.format({
                    dir: Path.resolve(Options.destination, Path.dirname(Path.relative(Options._[0], path))),
                    name: Path.parse(path).name,
                    ext: '.' + Options.outputFormat
                });
            if (!Options.delete)
                if (fs.existsSync(finalOutput)) {
                    Logger.warn('Output for', chalk.bold(Path.basename(path)), 'already exists at', chalk.bold(finalOutput) + '. Skipping...');
                    continue;
                }
            videos.push(new Video({
                input: {
                    path
                },
                output: {
                    path: tempOutput
                },
                modules,
                finalOutput
            }));
        }
        resolve(videos);
    });
}

function createVideoList(videos) {
    return new Promise(function(resolve, reject) {
        let items = videos.reduce((arr, video) => {
            let list = new List(video.modules.reduce((arr, module) => {
                let item = new Item({
                    title: module.displayName
                });
                module.once('start', () => item.state = 'active');
                module.once('stop', (err) => {
                    if (err) {
                        item.state = 'failed';
                        item.error = err.message.split('\n')[0];
                    } else {
                        item.state = 'completed';
                    }
                });
                arr.push(item);
                return arr;
            }, []));
            let item = new Item({
                title: video.input.base,
                content: list
            });
            video.once('start', () => {
                item.state = 'active';
            });
            video.once('stopped', (err) => {
                if (err) {
                    item.state = 'failed';
                    item.error = err.message.split('\n')[0];
                } else {
                    Logger.info('Moving to final destination...');
                    fs.move(video.output.path, video.finalOutput, {overwrite: Options.delete}).then(() => {
                            Logger.info('Move complete.');
                            item.state = 'completed';
                        })
                        .catch((err) => {
                            item.state = 'failed';
                            item.error = err.message;
                        });
                }
            });
            arr.push(item);
            return arr;
        }, []);

        resolve(new List(items));
    });
}

function loop(i = 0) {
    return new Promise(function(resolve, reject) {

        if (i >= videos.length)
            return resolve();

        currentVideoIdx = i;

        videos[i].once('stopped', (err) => {
            if (err && err.message === 'Stopping.') return reject(err);
            loop(++i).then(resolve, reject);
        }).start();

        screen.statusRunning();
    });
}

let killCounter = 0;


// Provide usage information if no path was provided
if (!Options._[0]) {
    console.log('Package:', Package.name, '\t', 'Version:', Package.version);
    console.log('Description:', Package.description);
    yargs.usage();
    process.exit();
}

// Set log level to trace if debug is enabled
if (Options.debug) {
    Logger.setLevel('trace');
}


// Do processing
Logger.info('Locating video file(s) at', chalk.bold(Options._[0]) + '.');
utils.getVideoFiles(Options._[0])
    .then(createVideos)
    .then(createVideoList)
    .then((list) => {
        if (screen)
            screen.videoList = list
    })
    .then(loop)
    .then(() => {
        Logger.info('All videos completed processing!');
    })
    .catch((err) => {
        // Logger.error(err);
    })
    .then(() => {
        if (screen)
            screen.statusFinished();
    });
