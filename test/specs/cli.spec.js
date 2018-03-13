require("must/register");
import {
    Suite,
    Test
} from 'universalis-tester';
import {spawn} from 'child_process';

export default new Suite('CLI', [
    new Test('file', async function() {

    })
]);

// suite('Cli', function() {
//     suite('conversion', function() {
//         test('should convert one video', function(done) {
//             let cmd = spawn('dist/nmmes-cli.js', ['nmmes-test-files/video/hale_bopp_1-(invalidCrop240p)-480p[yuv420p][mpeg1]-noadu-nosub.mpg', '-d', '/tmp/test']);
//             cmd.close(done);
//         });
//     });
// });
