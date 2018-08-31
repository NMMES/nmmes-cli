import http from 'http';
import {
    Server as RPCServer
} from 'nmmes-simple-rpc';
import {
    promisify
} from 'util';
import fs from 'fs-extra';
import Path from 'path';
// const exec = promisify(require('child_process').exec);

export default class RPC extends RPCServer {
    constructor(options) {
        const httpServer = http.createServer();
        super({
            server: httpServer
        });
        Object.assign(this, options);
        this.httpServer = httpServer;
        process.once('SIGINT', () => {
            this.close();
            this.httpServer.close();
        });
        this.registerNamespaces();
    }

    registerNamespaces() {

        // MODULES
        this.register('modules.list', () => {
            return Object.keys(this.modules);
        });

        this.register('modules.options', (module) => {
            if (!this.modules[module])
                throw new Error(`Module "${module}" does not exist.`);
            return this.modules[module].options();
        });

        // VIDEOS
        this.register('videos.list', () => {
            return this.queue.queue;
        });

        // FILES
        this.register('files.list', async (directory = '/') => {
            let files = await fs.readdir(directory);
            files = files.filter(path => !(/(^|\/)\.[^/.]/g).test(path));
            let promises = [];
            for (const file of files) {
                promises.push(fs.lstat(Path.join(directory, file)));
            }
            const stats = await Promise.all(promises);
            const statFiles = files.reduce((obj, file, idx) => {
                let type = stats[idx].isDirectory() ? 'd' : stats[idx].isFile() ? 'f' : 'o';
                obj[file] = {
                    type,
                    size: stats[idx].size
                };
                return obj;
            }, {});
            return statFiles;
        });

        this.register('files.metadata', async (path) => {
            return await fs.lstat(path);
        });
    }

    async listen() {
        await promisify(this.httpServer.listen.bind(this.httpServer)).apply(this.httpServer, arguments);
        const addr = this.httpServer.address();
        const location = typeof addr == 'string' ? `socket ${addr}` : `${addr.address}:${addr.port}`;
        this.logger.info(`Listening for RPC on "${location}".`);
        this.on('connection', (socket, req) => {
            this.logger.debug(`New RPC connection from: ${req.connection.remoteAddress}`);
        });
    }
}
