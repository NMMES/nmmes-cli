import {
    Logger
} from 'nmmes-backend';
import loadOptions from './options';
import chalk from 'chalk';
import chokidar from 'chokidar';
import VideoQueue from './videoQueue';
import RPC from './rpcServer';
import {getVideoPaths, createVideo} from './utils';

export default async function run() {
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
            ignored: /(^|[/\\])\../,
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
    } else if (args._.length > 0) {
        for (let path of await getVideoPaths(args._[0])) {
            queue.append(createVideo(path, modules, args));
        }
        queue.start();
    }

    if (args.rpcPort || args.rpcSocket) {
        let rpcServer = new RPC({logger: Logger, modules, queue});
        if (args.rpcSocket)
            await rpcServer.listen(args.rpcSocket);
        else
            await rpcServer.listen(args.rpcPort, args.rpcBind);
    }
}
