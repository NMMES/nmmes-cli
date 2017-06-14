import fs from 'fs';
import recursive from 'recursive-readdir';
import isVideo from './isVideo.js';
export function getVideoFiles(path) {
    return new Promise(function(resolve, reject) {
        function ignoreFunc(file, stats) {
            if (stats.isDirectory())
                return false;
            return !isVideo(file);
        }
        fs.stat(path, (err, stats) => {
            if (err)
                return reject(err);
            if (stats.isFile() && isVideo(path)) {
                return resolve([path]);
            } else if (stats.isDirectory()) {
                recursive(path, [ignoreFunc]).then(resolve, reject);
            } else {
                return reject(new Error('Unsupported file type.'));
            }
        });
    });
}
export default getVideoFiles;
