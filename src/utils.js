import {
    Video,
    Logger
} from 'nmmes-backend';
import Path from 'path';
import fs from 'fs-extra';
import {promisify} from 'util';

import mime from 'mime';
const recursive = promisify(require('recursive-readdir'));

export function createVideo(path, modules, args) {

    const basename = Path.basename(path, Path.extname(path));
    const outputBase = basename + '.' + args.outputFormat;
    const outputPath = Path.resolve(args.tempDirectory, basename, outputBase);

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

            return new moduleClass(moduleOptions, Logger);
        })
    }, Logger);
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
