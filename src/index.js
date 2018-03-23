import {
    Video,
    Logger
} from 'nmmes-backend';
import loadOptions from './options.js';
import chalk from 'chalk';
import Path from 'path';
import fs from 'fs-extra';
import chokidar from 'chokidar';

class VideoQueue {
    queue = [];
    args = {};
    _stopping = false;
    constructor(args) {
        this.args = args;
    }
    append(video) {
        this.queue.push(video);
    }
    start() {
        if (this._running)
            return;

        process.once('SIGINT', this.stop.bind(this));

        if (this.queue.length < 1)
            return Logger.warn("No videos found.");

        if (this.queue.length > 1)
            Logger.info('Videos found:\n\t-', this.queue.map((vid) => {
                return chalk.yellow(Path.relative(this.args._[0], vid.input.path));
            }).join('\n\t- '));

        this._loop();
    }
    stop() {
        if (!this._running)
            return;
        this._stopping = true;
    }
    async _loop() {
        this._running = true;
        let v = this.queue.shift();
        if (typeof v === 'undefined') {
            Logger.info('Processing queue emptied.');
            return this.stop();
        }
        try {
            if (this.args.s.length) {
                await v._initialize();
                const codecIdx = this.args.s.indexOf(v.input.metadata[0].format.video_codec);
                if (~codecIdx) {
                    Logger.log(`Removing "${v.input.path}" from queue because it has video codec ${chalk.bold(this.args.s[codecIdx])}.`);
                    this._loop();
                    return;
                }
            }

            let destinationDir;
            if (this.args.delete) {
                destinationDir = Path.dirname(v.input.path), Path.basename(v.output.path)
            } else {
                const relativeDirToInput = Path.dirname(Path.relative(this.args._[0], v.input.path));
                const relativeDestinationDir = Path.resolve(this.args.destination, relativeDirToInput);
                destinationDir = relativeDestinationDir;
            }

            if (await fs.exists(Path.resolve(destinationDir, Path.basename(v.output.path)))) {
                Logger.log(`Removing "${v.input.path}" from queue because destination file already exists.`);
                this._loop();
                return;
            }

            await v.run();

            if (this.args.delete) {
                Logger.log(`Removing ${chalk.bold(v.input.path)}...`);
                await fs.remove(v.input.path);
            }

            const destination = Path.resolve(destinationDir, Path.basename(v.output.path));
            if (await fs.exists(v.output.path)) {
                Logger.trace(`Creating destination directory ${destinationDir}.`);
                await fs.ensureDir(destinationDir);

                Logger.log(`Moving ${chalk.bold(v.output.path)} -> ${chalk.bold(destination)}... Wait for completion message.`);
                fs.move(v.output.path, destination).then(() => Logger.log(`Moved ${chalk.bold(v.output.path)} -> ${chalk.bold(destination)}.`), err => {
                    throw err;
                });
            }
        } catch (e) {
            if (await fs.exists(v.output.path)) {
                await fs.remove(v.output.path);
            }
            if (this._stopping) {
                this._running = false;
                this._stopping = false;
                Logger.warn('Stopping because stop request receieved.');
                return;
            }
            Logger.error(e.message);
            Logger.debug(e);
        }
        this._loop();
    }
    _done() {
        this.stop();
    }
}

(async () => {
    let options;
    try {
        options = await loadOptions();
    } catch (e) {
        Logger.error(e.message);
        Logger.debug(e);
        await Logger.flush();
        process.exit(1);
    }

    let args = options.args,
        modules = options.modules;

    Logger.trace('Options:', args);

    let queue = new VideoQueue(args);

    if (args.watch) {
        Logger.info(`Watching ${chalk.bold(args._[0])} for new video files...`);
        let watcher = chokidar.watch(args._[0], {
            ignoreInitial: true,
            ignored: /(^|[\/\\])\../,
            awaitWriteFinish: true
        }).on('add', (path) => {
            getVideoPaths(path).then(paths => {
                for (let path of paths) {
                    queue.append(createVideo(path, modules, args));
                }
                queue.start();
            })
        });
        process.once('SIGINT', watcher.close.bind(watcher));
        return;
    }

    for (let path of await getVideoPaths(args._[0])) {
        queue.append(createVideo(path, modules, args));
    }
    queue.start();

})();

import util from 'util';
import mime from 'mime';
const recursive = util.promisify(require('recursive-readdir'));

function createVideo(path, modules, args) {

    const outputBase = Path.basename(path, Path.extname(path)) + '.' + args.outputFormat;
    const outputPath = Path.resolve(args.tempDirectory, outputBase);

    return new Video({
        input: {
            path
        },
        output: {
            path: outputPath
        },
        modules: Object.entries(modules).map(modulePair => {
            let name = modulePair[0];
            let moduleClass = modulePair[1];

            let moduleOptions = Object.keys(moduleClass.options()).reduce((obj, key) => {
                obj[key] = args[`${name}-${key}`];
                return obj;
            }, {});

            return new moduleClass(moduleOptions);
        })
    })
}

export async function getVideoPaths(path) {
    function ignoreFunc(file, stats) {
        if (stats.isDirectory())
            return false;
        return !isVideo(file);
    }
    let stats = await fs.stat(path);

    if (stats.isFile() && isVideo(path)) {
        return [path];
    } else if (stats.isDirectory()) {
        return recursive(path, [ignoreFunc]);
    } else {
        throw new Error('Unsupported file type.');
    }
}

const SUPPORTED_EXTENSIONS = ['.m2ts', '.mts'];

export function isVideo(path) {
    const ext = Path.extname(path);
    if (!ext) return false;
    const mimeType = mime.getType(ext);
    if (!mimeType) return false;
    return mimeType.startsWith('video/') || ~SUPPORTED_EXTENSIONS.indexOf(ext);
}
