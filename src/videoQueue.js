import {
    Logger
} from 'nmmes-backend';
import chalk from 'chalk';
import Path from 'path';
import fs from 'fs-extra';

export default class VideoQueue {
    constructor(args) {
        this.args = args;
        this.queue = [];
        this._stopping = false;
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

            if (await fs.exists(v.output.path)) {
                Logger.trace(`Creating destination directory ${destinationDir}.`);
                await fs.ensureDir(destinationDir);

                Logger.debug(`Moving ${chalk.bold(v.output.dir+Path.sep+'*')} -> ${chalk.bold(destinationDir)}...`);
                const files = await fs.readdir(v.output.dir);
                try {
                    for (const file of files) {
                        const src = Path.resolve(v.output.dir, file);
                        const dest = Path.resolve(destinationDir, file);
                        await fs.move(src, dest);
                        Logger.trace(`Moved ${src} -> ${chalk.bold(dest)}.`);
                    }
                    Logger.info(`Moved ${chalk.bold(v.output.dir+Path.sep+'*')} -> ${chalk.bold(destinationDir)}.`);
                    await fs.remove(v.output.dir);
                } catch (e) {
                    Logger.error(e);
                }
            }
        } catch (e) {
            if (await fs.exists(v.output.dir)) {
                await fs.remove(v.output.dir);
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
