import {
    Video,
    Logger
} from 'nmmes-backend';
import loadOptions from './options.js';
import chalk from 'chalk';
import Path from 'path';
import fs from 'fs-extra';

let STOPREQ = false;

process.on('SIGINT', () => STOPREQ = true);

(async () => {
    let options;
    try {
        options = await loadOptions();
    } catch (e) {
        Logger.error(e.message);
        Logger.debug(e);
        process.exit(1);
    }

    let args = options.args,
        modules = options.modules;

    Logger.trace('Options:', options.args);

    let videos = [];
    for (let path of await getVideoPaths(args._[0])) {

        const outputBase = Path.basename(path, Path.extname(path)) + '.' + args.outputFormat;
        const outputPath = Path.resolve(args.tempDirectory, outputBase);

        videos.push(new Video({
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
        }));
    }

    if (args.s.length) {
        for (const idx in videos) {
            const vid = videos[idx];
            await vid._initialize();
            const codecIdx = args.s.indexOf(vid.input.metadata[0].format.video_codec);
            if (~codecIdx) {
                Logger.log(`Removing "${vid.input.path}" from queue because it has video codec ${chalk.bold(args.s[codecIdx])}.`);
                videos.splice(idx, 1);
            }
        }
    }

    if (videos.length < 1)
        return Logger.warn("No videos found.");

    if (videos.length > 1)
        Logger.info('Videos found:\n\t-', videos.map((vid) => {
            return chalk.yellow(Path.relative(args._[0], vid.input.path));
        }).join('\n\t- '));

    for (let v of videos) {
        try {
            await v.run();

            if (await fs.exists(v.output.path)) {
                let destination;
                if (args.delete) {
                    Logger.log(`Removing ${chalk.bold(v.input.path)}...`);
                    await fs.remove(v.input.path);
                    destination = Path.join(Path.dirname(v.input.path), Path.basename(v.output.path))
                } else {
                    const relativeDirToInput = Path.dirname(Path.relative(args._[0], v.input.path));
                    const relativeDestinationDir = Path.resolve(args.destination, relativeDirToInput);
                    destination = Path.resolve(relativeDestinationDir, Path.basename(v.output.path));
                }

                Logger.trace(`Creating destination directory ${Path.dirname(destination)}.`);
                await fs.ensureDir(Path.dirname(destination));

                Logger.log(`Moving ${chalk.bold(v.output.path)} -> ${chalk.bold(destination)}... Wait for completion message.`);
                fs.move(v.output.path, destination).then(() => Logger.log(`Moved ${chalk.bold(v.output.path)} -> ${chalk.bold(destination)}.`), err => {
                    throw err;
                });
            }
        } catch (e) {
            if (STOPREQ) {
                Logger.warn('Stopping because SIGINT receieved.');
                break;
            }
        }
    }

    Logger.info('All videos processed.');
})();

import bluebird from 'bluebird';
import mime from 'mime';
const recursive = bluebird.promisify(require('recursive-readdir'));

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
    return mime.getType(ext).startsWith('video/') || ~SUPPORTED_EXTENSIONS.indexOf(ext);
}
