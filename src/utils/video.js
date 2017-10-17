import bluebird from 'bluebird';
import Path from 'path';
import mime from 'mime';
const recursive = bluebird.promisify(require('recursive-readdir'));
const fs = bluebird.promisifyAll(require('fs'));


export async function getPaths(path) {
    function ignoreFunc(file, stats) {
        if (stats.isDirectory())
            return false;
        return !isVideo(file);
    }
    let stats = await fs.statAsync(path);

    if (stats.isFile() && isVideo(path)) {
        return [path];
    } else if (stats.isDirectory()) {
        return recursive(path, [ignoreFunc]);
    } else {
        throw new Error('Unsupported file type.');
    }
}

const SUPPORTED_EXTENSIONS = ['.m2ts'];

export function isVideo(path) {
    const ext = Path.extname(path);
    return mime.getType(ext).startsWith('video/') || ~SUPPORTED_EXTENSIONS.indexOf(ext)
}
