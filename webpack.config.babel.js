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

    if (env === 'development' && !fs.existsSync(symLink))
        fs.symlinkSync(path.resolve(__dirname, 'node_modules'), symLink, 'dir');

    return {
        target: 'async-node',
        context: path.resolve(__dirname, "src"),
        entry: [
            './index.js'
        ],

        output: {
            path: env === 'production' ? path.resolve(__dirname) : path.join(tempDir),
            library: packageJson.name,
            libraryTarget: "umd",
            publicPath: '',
            filename: packageJson.name + '.js',
            devtoolModuleFilenameTemplate: '[absolute-resource-path]',
            devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
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
                new webpack.BannerPlugin({
                    banner: 'require("source-map-support").install();',
                    raw: true
                }),
                new webpack.BannerPlugin({
                    banner: '#!/bin/env node\n',
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
