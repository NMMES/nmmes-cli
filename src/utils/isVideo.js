import mime from 'mime';
import Path from 'path';

const SUPPORTED_EXTENSIONS = ['.m2ts'];

export function isVideo(path) {
    return mime.lookup(path).startsWith('video/') || ~SUPPORTED_EXTENSIONS.indexOf(Path.extname(path))
}
export default isVideo;
