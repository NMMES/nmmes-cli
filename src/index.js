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
