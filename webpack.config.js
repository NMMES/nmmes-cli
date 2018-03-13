const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const nodeExternals = require('webpack-node-externals');
const packageJson = require('./package.json');

let tempDir = path.join(os.tmpdir(), packageJson.name);
fs.ensureDirSync(tempDir);
let symLink = path.join(tempDir, 'node_modules');

module.exports = function(env) {
    env = env ? env : 'development';

    const output = env === 'production' ? path.resolve(__dirname, 'dist') : path.join(tempDir);

    if (env === 'development' && !fs.existsSync(symLink))
        fs.symlinkSync(path.resolve(__dirname, 'node_modules'), symLink, 'dir');

    if (env === 'production') {
        const packageJsonOutput = path.join(output, 'package.json');
        let json = Object.assign({}, packageJson);
        json.main = json.name + '.js';
        fs.writeFileSync(packageJsonOutput, JSON.stringify(json));
    }

    return {
        target: 'async-node',
        context: path.resolve(__dirname, "src"),
        entry: [
            './index.js'
        ],

        output: {
            path: output,
            library: packageJson.name,
            libraryTarget: "umd",
            publicPath: '',
            filename: packageJson.name + '.js',
            // devtoolModuleFilenameTemplate: '[absolute-resource-path]',
            // devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
        },

        externals: [nodeExternals()],

        resolve: {
            extensions: ['.js', '.json'],
            // unsafeCache: true
        },


        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        },

        plugins: ([
                new webpack.EnvironmentPlugin({
                    NODE_ENV: env
                }),
                new webpack.BannerPlugin({
                    banner: 'import \'source-map-support/register\';'
                }),
                new webpack.BannerPlugin({
                    banner: '#!/usr/bin/env node\n',
                    raw: true
                }),
            ])
            .concat(env === 'production' ? [

            ] : [

            ]),

        stats: {
            colors: true
        },

        devtool: 'source-map',
    };
}
