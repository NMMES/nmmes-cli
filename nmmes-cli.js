#!/bin/env node

require("source-map-support").install();
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("path"), require("chalk"), require("yargs"), require("blessed"), require("bluebird"), require("cli-spinners"), require("figures"), require("fs"), require("fs-extra"), require("lodash.merge"), require("lodash.throttle"), require("mime"), require("nmmes-backend"), require("nmmes-module-autocrop"), require("nmmes-module-encoder"), require("nmmes-module-he-audio"), require("nmmes-module-normalize"), require("nmmes-module-sample"), require("nmmes-module-stats"), require("node-noop"), require("optional"), require("os"), require("recursive-readdir"), require("stream"));
	else if(typeof define === 'function' && define.amd)
		define(["path", "chalk", "yargs", "blessed", "bluebird", "cli-spinners", "figures", "fs", "fs-extra", "lodash.merge", "lodash.throttle", "mime", "nmmes-backend", "nmmes-module-autocrop", "nmmes-module-encoder", "nmmes-module-he-audio", "nmmes-module-normalize", "nmmes-module-sample", "nmmes-module-stats", "node-noop", "optional", "os", "recursive-readdir", "stream"], factory);
	else if(typeof exports === 'object')
		exports["nmmes-cli"] = factory(require("path"), require("chalk"), require("yargs"), require("blessed"), require("bluebird"), require("cli-spinners"), require("figures"), require("fs"), require("fs-extra"), require("lodash.merge"), require("lodash.throttle"), require("mime"), require("nmmes-backend"), require("nmmes-module-autocrop"), require("nmmes-module-encoder"), require("nmmes-module-he-audio"), require("nmmes-module-normalize"), require("nmmes-module-sample"), require("nmmes-module-stats"), require("node-noop"), require("optional"), require("os"), require("recursive-readdir"), require("stream"));
	else
		root["nmmes-cli"] = factory(root["path"], root["chalk"], root["yargs"], root["blessed"], root["bluebird"], root["cli-spinners"], root["figures"], root["fs"], root["fs-extra"], root["lodash.merge"], root["lodash.throttle"], root["mime"], root["nmmes-backend"], root["nmmes-module-autocrop"], root["nmmes-module-encoder"], root["nmmes-module-he-audio"], root["nmmes-module-normalize"], root["nmmes-module-sample"], root["nmmes-module-stats"], root["node-noop"], root["optional"], root["os"], root["recursive-readdir"], root["stream"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_27__, __WEBPACK_EXTERNAL_MODULE_28__, __WEBPACK_EXTERNAL_MODULE_29__, __WEBPACK_EXTERNAL_MODULE_30__, __WEBPACK_EXTERNAL_MODULE_31__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
	"name": "nmmes-cli",
	"version": "0.0.1",
	"description": "A command line interface front end for nmmes-backend.",
	"author": "Ayrton Sparling",
	"license": "LGPL-3.0",
	"engines": {
		"node": ">=6.4.0"
	},
	"bin": {
		"nmmes": "nmmes-cli.js"
	},
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"dev": "webpack --env=development --watch",
		"build": "webpack --define process.env.NODE_ENV=\"production\" --env=production --progress",
		"profile": "node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt",
		"preversion": "npm test",
		"version": "git add .",
		"postversion": "git push && git push --tags",
		"patch-release": "npm version patch && npm publish"
	},
	"main": "nmmes-cli.js",
	"repository": {
		"type": "git",
		"url": "https://github.com/NMMES/nmmes-cli.git"
	},
	"dependencies": {
		"blessed": "^0.1.81",
		"bluebird": "^3.5.0",
		"chalk": "^1.1.3",
		"cli-spinners": "^1.0.0",
		"figures": "^2.0.0",
		"fs-extra": "^3.0.1",
		"lodash.merge": "^4.6.0",
		"lodash.throttle": "^4.1.1",
		"mime": "^1.3.6",
		"moment": "^2.18.1",
		"moment-duration-format": "^1.3.0",
		"nmmes-backend": "^0.0.1",
		"nmmes-module-autocrop": "^0.0.1",
		"nmmes-module-encoder": "^0.0.1",
		"nmmes-module-he-audio": "^0.0.1",
		"nmmes-module-normalize": "^0.0.1",
		"nmmes-module-sample": "^0.0.1",
		"nmmes-module-stats": "^0.0.1",
		"node-noop": "^1.0.0",
		"optional": "^0.1.3",
		"pidusage": "^1.1.5",
		"recursive-readdir": "^2.2.1",
		"source-map-support": "^0.4.15",
		"tracer": "^0.8.9",
		"yargs": "^8.0.1"
	},
	"devDependencies": {
		"babel-core": "^6.24.1",
		"babel-eslint": "^7.2.3",
		"babel-loader": "^7.0.0",
		"babel-plugin-module-resolver": "^2.7.1",
		"babel-preset-es2016": "^6.24.1",
		"babel-preset-stage-2": "^6.24.1",
		"babel-register": "^6.24.1",
		"babel-runtime": "^6.23.0",
		"eslint": "^3.19.0",
		"source-map-loader": "^0.2.1",
		"webpack": "^2.5.1",
		"webpack-node-externals": "^1.6.0"
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isVideo */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mime__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);



const SUPPORTED_EXTENSIONS = ['.m2ts'];

function isVideo(path) {
    return __WEBPACK_IMPORTED_MODULE_0_mime___default.a.lookup(path).startsWith('video/') || ~SUPPORTED_EXTENSIONS.indexOf(__WEBPACK_IMPORTED_MODULE_1_path___default.a.extname(path));
}
/* harmony default export */ __webpack_exports__["a"] = (isVideo);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nmmes_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nmmes_backend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screen_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__options_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_chalk__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_yargs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_yargs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_yargs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fs_extra__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fs_extra___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_fs_extra__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_stream__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_path__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_path__);

__WEBPACK_IMPORTED_MODULE_0_bluebird___default.a.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: false,
    // Enable monitoring
    monitoring: false
});














const heAudio = __webpack_require__(23);
const encoder = __webpack_require__(22);
const normalizer = __webpack_require__(24);
const autocrop = __webpack_require__(21);
const stats = __webpack_require__(26);
const sample = __webpack_require__(25);

let screen,
    videos = [],
    currentVideoIdx = 0;

if (!__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].simple) {
    screen = new __WEBPACK_IMPORTED_MODULE_3__screen_js__["a" /* default */]();
    screen.logStream = __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].stream = new __WEBPACK_IMPORTED_MODULE_10_stream__["PassThrough"]();
    console.oldLog = console.log;
    console.oldError = console.error;
    console.log = function () {
        console.oldLog.apply(console, arguments);
        __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].log.apply(__WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"], arguments);
    };
    console.error = function () {
        console.oldError.apply(console, arguments);
        __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].error.apply(__WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"], arguments);
    };

    screen.key(['escape', 'q', 'C-c'], function (ch, key) {
        if (++killCounter > 2) {
            __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].error('Kill signal receieved more than 9 times, forcing process death... DIE ALREADY!');
            screen.destroy();
            process.kill(-process.pid, 'SIGKILL');
        }
        if (screen._status.content === 'Running...') {
            videos[currentVideoIdx].stop(new Error('Stopping.'));
            return;
        }

        process.kill(-process.pid, 'SIGTERM');
    });
}

function createVideos(paths) {
    return new __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a(function (resolve, reject) {
        __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].debug(`Videos found [${paths.length}]:\n\t-`, paths.join('\n\t-'));
        for (let path of paths) {

            let modules = [];
            if (__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].normalizeLevel >= 1) {
                modules.push(new autocrop());
            }
            if (__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].normalizeLevel >= 2) {
                modules.push(new normalizer());
            }
            if (__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].heAudio) {
                modules.push(new heAudio({
                    encodeLossless: __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].forceHeAudio
                }));
            }
            modules.push(new encoder({
                defaults: {
                    video: {
                        'c:{POS}': __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].videoCodec,
                        'crf': __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].quality,
                        'preset': __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].preset
                    }
                }
            }));
            if (__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].stats) {
                if (__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].stats === true) modules.push(new stats());else modules.push(new stats({
                    output: __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].stats
                }));
            }
            if (__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].sample) {
                modules.push(new sample({
                    length: __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].previewLength
                }));
            }

            let tempOutput = __WEBPACK_IMPORTED_MODULE_11_path___default.a.format({
                dir: __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].tempDirectory,
                name: __WEBPACK_IMPORTED_MODULE_11_path___default.a.parse(path).name,
                ext: '.' + __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].outputFormat
            });
            let finalOutput = __WEBPACK_IMPORTED_MODULE_11_path___default.a.format({
                dir: __WEBPACK_IMPORTED_MODULE_11_path___default.a.resolve(__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].destination, __WEBPACK_IMPORTED_MODULE_11_path___default.a.dirname(__WEBPACK_IMPORTED_MODULE_11_path___default.a.relative(__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */]._[0], path))),
                name: __WEBPACK_IMPORTED_MODULE_11_path___default.a.parse(path).name,
                ext: '.' + __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].outputFormat
            });
            if (!__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].delete) if (__WEBPACK_IMPORTED_MODULE_9_fs_extra___default.a.existsSync(finalOutput)) {
                __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].warn('Output for', __WEBPACK_IMPORTED_MODULE_7_chalk___default.a.bold(__WEBPACK_IMPORTED_MODULE_11_path___default.a.basename(path)), 'already exists at', __WEBPACK_IMPORTED_MODULE_7_chalk___default.a.bold(finalOutput) + '. Skipping...');
                continue;
            }
            videos.push(new __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Video"]({
                input: {
                    path
                },
                output: {
                    path: tempOutput
                },
                modules,
                finalOutput
            }));
        }
        resolve(videos);
    });
}

function createVideoList(videos) {
    return new __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a(function (resolve, reject) {
        let items = videos.reduce((arr, video) => {
            let list = new __WEBPACK_IMPORTED_MODULE_4__list_js__["a" /* List */](video.modules.reduce((arr, module) => {
                let item = new __WEBPACK_IMPORTED_MODULE_4__list_js__["b" /* Item */]({
                    title: module.displayName
                });
                module.once('start', () => item.state = 'active');
                module.once('stop', err => {
                    if (err) {
                        item.state = 'failed';
                        item.error = err.message.split('\n')[0];
                    } else {
                        item.state = 'completed';
                    }
                });
                arr.push(item);
                return arr;
            }, []));
            let item = new __WEBPACK_IMPORTED_MODULE_4__list_js__["b" /* Item */]({
                title: video.input.base,
                content: list
            });
            video.once('start', () => {
                item.state = 'active';
            });
            video.once('stopped', err => {
                if (err) {
                    item.state = 'failed';
                    item.error = err.message.split('\n')[0];
                } else {
                    __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].info('Moving to final destination...');
                    __WEBPACK_IMPORTED_MODULE_9_fs_extra___default.a.move(video.output.path, video.finalOutput, { overwrite: __WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].delete }).then(() => {
                        __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].info('Move complete.');
                        item.state = 'completed';
                    }).catch(err => {
                        item.state = 'failed';
                        item.error = err.message;
                    });
                }
            });
            arr.push(item);
            return arr;
        }, []);

        resolve(new __WEBPACK_IMPORTED_MODULE_4__list_js__["a" /* List */](items));
    });
}

function loop(i = 0) {
    return new __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a(function (resolve, reject) {

        if (i >= videos.length) return resolve();

        currentVideoIdx = i;

        videos[i].once('stopped', err => {
            if (err && err.message === 'Stopping.') return reject(err);
            loop(++i).then(resolve, reject);
        }).start();

        screen.statusRunning();
    });
}

let killCounter = 0;

// Set log level to trace if debug is enabled
if (__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */].debug) {
    __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].setLevel('trace');
}

// Do processing
__WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].info('Locating video file(s) at', __WEBPACK_IMPORTED_MODULE_7_chalk___default.a.bold(__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */]._[0]) + '.');
__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* getVideoFiles */](__WEBPACK_IMPORTED_MODULE_5__options_js__["a" /* default */]._[0]).then(createVideos).then(createVideoList).then(list => {
    if (screen) screen.videoList = list;
}).then(loop).then(() => {
    __WEBPACK_IMPORTED_MODULE_1_nmmes_backend__["Logger"].info('All videos completed processing!');
}).catch(err => {
    // Logger.error(err);
}).then(() => {
    if (screen) screen.statusFinished();
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cli_spinners__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cli_spinners___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cli_spinners__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_figures__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_figures___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_figures__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_throttle__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_throttle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_throttle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_noop__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_noop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_noop__);






const THROTTLE = 80;

class Item {
    constructor(options) {
        this._state = 'pending';
        this._error = '';
        this._open = false;
        this.output = '';
        this.onUpdate = __WEBPACK_IMPORTED_MODULE_4_node_noop__["noop"];
        this.render = __WEBPACK_IMPORTED_MODULE_2_lodash_throttle___default()(() => {
            this.output = `${this.icon} ${this.title} ${this._error}`;
            if (this.content && (this._state === 'active' || this._state === 'failed' || this._open === true)) {
                this.output += '\n   ' + this.content.output.replace(/\n/g, '\n   ');
            }
            this.onUpdate();
        }, THROTTLE);
        this.iconFrame = 0;

        Object.assign(this, options);
        if (this.content) this.content.onUpdate = this.render;
        this.render();
    }
    set state(state) {
        this._state = state;
        if (state === 'active') {
            this.interval = setInterval(this.render.bind(this), 80);
        } else {
            if (this.interval) clearInterval(this.interval);
        }
        this.render();
    }
    get state() {
        return this._state;
    }
    set open(open) {
        this._option = open;
        this.render();
    }
    set error(err) {
        this._error = __WEBPACK_IMPORTED_MODULE_3_chalk___default.a.red('- ' + err.trim());
        this.render();
    }

    get icon() {
        let icon = '';
        if (this.iconFrame >= __WEBPACK_IMPORTED_MODULE_0_cli_spinners___default.a.dots.frames.length) this.iconFrame = 0;
        switch (this._state) {
            case 'active':
                icon = __WEBPACK_IMPORTED_MODULE_3_chalk___default.a.blue(__WEBPACK_IMPORTED_MODULE_0_cli_spinners___default.a.dots.frames[this.iconFrame++]);
                break;
            case 'completed':
                icon = __WEBPACK_IMPORTED_MODULE_1_figures___default.a.tick;
                break;
            case 'failed':
                icon = __WEBPACK_IMPORTED_MODULE_1_figures___default.a.cross;
                break;
            default:
                icon = '-';
                break;
        }
        return `${icon} `;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Item;


class List {
    constructor(items) {
        this.output = '';
        this.onUpdate = __WEBPACK_IMPORTED_MODULE_4_node_noop__["noop"];
        this.render = __WEBPACK_IMPORTED_MODULE_2_lodash_throttle___default()(() => {
            this.output = this.items.reduce((arr, item) => {
                arr.push(item.output);
                return arr;
            }, []).join('\n');
            this.onUpdate();
        }, THROTTLE);

        let _self = this;
        for (let item of items) {
            item.onUpdate = () => {
                _self.render();
            };
        }
        this.items = items;
        this.render();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = List;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_yargs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_yargs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_yargs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_optional__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_optional___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_optional__);






const userSettings = __WEBPACK_IMPORTED_MODULE_4_optional___default()(__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(process.cwd(), __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name + '-settings.json')) || {};

let args = __WEBPACK_IMPORTED_MODULE_3_yargs___default.a.usage('Usage: $0 [options] file|directory').options({
    'version': {
        describe: 'Displays version information.',
        group: 'General:'
    },
    'help': {
        describe: 'Displays help page.',
        group: 'General:'
    },
    'g': {
        alias: 'temp-directory',
        default: userSettings['temp-directory'] || __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__WEBPACK_IMPORTED_MODULE_1_os___default.a.tmpdir(), __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name),
        describe: 'Folder where files are stored during encoding.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'v': {
        alias: 'verbose',
        default: userSettings['verbose'] || false,
        describe: 'Enables verbose mode. Prints extra information.',
        type: 'boolean',
        group: 'General:'
    },
    'o': {
        alias: 'overwrite',
        default: userSettings['override'] || false,
        describe: 'Allows conversion of videos that are already encoded by the hevc codec.',
        type: 'boolean',
        group: 'General:'
    },
    'p': {
        alias: 'preview',
        default: userSettings['preview'] || false,
        describe: 'Only encode a preview of the video starting at middle of video. See -l/--preview-length for more info.',
        type: 'boolean',
        group: 'General:'
    },
    'd': {
        alias: 'destination',
        default: userSettings['destination'] || __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(process.cwd(), 'h265'),
        describe: 'Folder where encoded files are output.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    // 'log-file': {
    //     default: userSettings['log-file'] || Path.resolve(process.cwd(), 'h265ize.log'),
    //     describe: 'Sets the log file location for all output from h265ize. Enable debug mode via the --debug flag to output to the log file.',
    //     type: 'string',
    //     normalize: true,
    //     group: 'General:'
    // },
    'm': {
        alias: 'preset',
        default: userSettings['preset'] || 'fast',
        describe: 'x265 encoder preset.',
        choices: ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow', 'placebo'],
        type: 'string',
        group: 'General:'
    },
    'n': {
        alias: 'native-language',
        default: userSettings['native-language'] || '',
        describe: 'The native language used to select default audio and subtitles. You may use 3 letter or 2 letter ISO 639-2 Alpha-3/Alpha-2 codes or the full language name. Examples: [eng|en|English|jpn|ja|Japanese]',
        type: 'string',
        group: 'General:'
    },
    'f': {
        alias: 'output-format',
        default: userSettings['output-format'] || 'mkv',
        describe: 'Output container format.',
        choices: ['mkv', 'mp4', 'm4v'],
        type: 'string',
        group: 'General:'
    },
    'c': {
        alias: 'video-codec',
        default: userSettings['video-codec'] || 'libx265',
        describe: 'Video codec to encode the video to.',
        choices: ['libx264', 'libx265'],
        type: 'string',
        group: 'Video:'
    },
    'as-preset': {
        default: userSettings['as-preset'] || 'none',
        describe: 'My personal presets. Descriptions of each preset\'s use and function can be found on the github page.',
        choices: ['anime', 'testing-ssim', 'none'],
        type: 'string',
        group: 'Video:'
    },
    'x': {
        alias: 'extra-options',
        default: userSettings['extra-options'] || '',
        describe: 'Extra x265 options. Options can be found on the x265 options page.',
        type: 'string',
        group: 'Video:'
    },
    'q': {
        alias: 'quality',
        default: userSettings['quality'] || 19,
        describe: 'Sets the qp quality target',
        type: 'number',
        group: 'Video:'
    },
    'video-bitrate': {
        default: userSettings['video-bitrate'] || 0,
        describe: 'Sets the video bitrate, set to 0 to use qp rate control instead of a target bitrate.',
        type: 'number',
        group: 'Video:'
    },
    'accurate-timestamps': {
        default: userSettings['accurate-timestamps'] || false,
        describe: 'Become blu-ray complient and reduce the max keyInt to the average frame rate.',
        type: 'boolean',
        group: 'Video:'
    },
    'he-audio': {
        default: userSettings['he-audio'] || false,
        describe: 'Re-encode audio to opus at 40kbps/channel.',
        type: 'boolean',
        group: 'Audio:'
    },
    'force-he-audio': {
        default: userSettings['force-he-audio'] || false,
        describe: 'Convert all audio to HE format, including lossless formats.',
        type: 'boolean',
        group: 'Audio:'
    },
    'downmix-he-audio': {
        default: userSettings['downmix-he-audio'] || false,
        describe: 'Downmix he-audio opus to Dolby Pro Logic II at 40 kbps/channel. Enables he-audio.',
        type: 'boolean',
        group: 'Audio:'
    },
    'multi-pass': {
        default: userSettings['mutli-pass'] || 0,
        describe: 'Enable multiple passes by the encoder. Must be greater than 1.',
        type: 'number',
        group: 'Video:'
    },
    'bitdepth': {
        default: userSettings['bitdepth'] || 0,
        describe: 'Forces encoding videos at a specific bitdepth. Set to 0 to maintain original bitdepth.',
        type: 'number',
        group: 'Video:'
    },
    'screenshots': {
        default: userSettings['screenshots'] || false,
        describe: 'Take 6 screenshots at regular intervals throughout the finished encode.',
        type: 'boolean',
        group: 'Video:'
    },
    'normalize-level': {
        default: userSettings['normalize-level'] || 2,
        describe: 'Level of normalization to be applied. See https://github.com/FallingSnow/h265ize/issues/56 for more info.',
        type: 'number',
        group: 'Video:'
    },
    'scale': {
        default: userSettings['scale'] || false,
        describe: 'Width videos should be scaled to. Videos will always maintain original aspect ratio. [Examples: 720, 480]',
        type: 'number',
        group: 'Video:'
    },
    'stats': {
        default: userSettings['stats'] || false,
        describe: 'Output a stats file containing stats to this destination.',
        type: 'string',
        group: 'Advanced:'
    },
    'debug': {
        default: userSettings['debug'] || false,
        describe: 'Enables debug mode. Prints extra debugging information.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'delete': {
        default: userSettings['delete'] || false,
        describe: 'Delete source after encoding is complete and replaces it with new encode. [DANGER]',
        type: 'boolean',
        group: 'Advanced:'
    },
    'l': {
        alias: 'preview-length',
        default: userSettings['preview-length'] || 30000,
        describe: 'Milliseconds to encode in preview mode. Max is half the length of input video.',
        type: 'number',
        group: 'Advanced:'
    },
    'watch': {
        default: userSettings['watch'] || '',
        describe: 'Watches a directory for new video files to be converted.',
        type: 'string',
        group: 'Advanced:'
    },
    'simple': {
        default: userSettings['simple'] || false,
        describe: 'Disables the interface. Simply prints to the terminal.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'test': {
        default: userSettings['test'] || false,
        describe: 'Puts nmmes in test mode. No files will be encoded.',
        type: 'boolean',
        group: 'Advanced:'
    }
}).argv;

if (args.help) {
    console.log('Package:', __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name, '\t', 'Version:', __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.version);
    console.log('Description:', __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.description);
    __WEBPACK_IMPORTED_MODULE_3_yargs___default.a.showHelp();
    process.exit(0);
} else if (args.version) {
    console.log(__WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name, __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.version);
    process.exit(0);
}

// Provide usage information if no path was provided
if (!args._[0]) {
    console.log('Package:', __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name, '\t', 'Version:', __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.version);
    console.log('Description:', __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.description);
    __WEBPACK_IMPORTED_MODULE_3_yargs___default.a.showHelp();
    process.exit();
}

/* harmony default export */ __webpack_exports__["a"] = (args);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blessed__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blessed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_blessed__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_merge__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_merge__);



// import pusage from 'pidusage';

const defaults = {
    text: {
        padding: {
            left: 1,
            right: 1
        }
    },
    box: {
        border: {
            type: 'line'
        },
        style: {
            border: {
                fg: '#f0f0f0'
            }
        },
        padding: {
            left: 1,
            right: 1
        }
    }
};

let program = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.program();
program.hideCursor();

class Screen extends __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.screen {
    constructor() {
        super({
            program,
            fastCSR: true,
            dockBorders: true
        });
        this.title = __WEBPACK_IMPORTED_MODULE_1__package_json___default.a.name;
        this.init();
    }
    // updateSysInfo() {
    //     let _self = this;
    //     pusage.stat(process.pid, function(err, stat) {
    //         if (err) {
    //             _self._sysInfo.setContent(err.message);
    //             return _self.render();
    //         }
    //         _self._sysInfo.setContent(`CPU: ${stat.cpu.toFixed(0)}\tMEM: ${stat.memory}`);
    //         _self.render();
    //     })
    // }
    init() {
        // this.sysInfoInterval = setInterval(this.updateSysInfo.bind(this), 1000);
        this._statusBar = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.box(__WEBPACK_IMPORTED_MODULE_2_lodash_merge___default()({}, defaults.box, {
            parent: this,
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            padding: {
                left: 0,
                right: 0
            },
            border: false
        }));
        this._status = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.text(__WEBPACK_IMPORTED_MODULE_2_lodash_merge___default()({}, defaults.text, {
            parent: this._statusBar,
            style: {
                bg: 'blue'
            },
            content: 'Ready'
        }));
        // this._sysInfo = blessed.text(merge({}, defaults.text, {
        //     parent: this._statusBar,
        //     content: ''
        // }));

        this._videoList = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.box(__WEBPACK_IMPORTED_MODULE_2_lodash_merge___default()({}, defaults.box, {
            parent: this,
            label: 'Video List',
            left: 0,
            top: 0,
            bottom: this._statusBar.height,
            width: 50
        }));

        this._log = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.log(__WEBPACK_IMPORTED_MODULE_2_lodash_merge___default()({}, defaults.box, {
            parent: this,
            scrollback: 10000,
            scrollbar: {
                ch: ' ',
                inverse: true
            },
            mouse: true,
            label: 'Log',
            right: 0,
            top: 0,
            bottom: this._statusBar.height,
            width: this.width - this._videoList.width + 1
        }));
        this._log.on('scroll', this.render.bind(this));

        this._videoListStatus = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.text(__WEBPACK_IMPORTED_MODULE_2_lodash_merge___default()({}, defaults.text, {
            parent: this._videoList,
            left: 0,
            right: 0,
            height: 1,
            bottom: 0,
            align: 'center',
            content: 'Successful: 0\t Failed: 0'
        }));
        this._list = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.box(__WEBPACK_IMPORTED_MODULE_2_lodash_merge___default()({}, defaults.box, {
            parent: this._videoList,
            scrollable: true,
            scrollbar: {
                ch: ' ',
                inverse: true
            },
            mouse: true,
            left: 0,
            top: 0,
            right: 0,
            border: false,
            bottom: this._videoListStatus.height
        }));
        this._list.on('scroll', this.render.bind(this));
        this.render();
    }
    set videoList(list) {
        let _self = this;
        list.onUpdate = () => {
            let failed = 0,
                successful = 0;
            for (let item of list.items) {
                if (item.state === 'failed') failed++;else if (item.state === 'successful') successful++;
            }
            _self._videoListStatus.setContent(`Successful: ${successful}\tFailed: ${failed}`);
            _self._list.setContent(list.output);
            _self.render();
        };
        this._list.setContent(list.output);
        this.render();
    }
    set logStream(stream) {
        let _self = this;
        stream.on('data', buffer => {
            let string = buffer.toString('utf8').trim();
            _self._log.pushLine(string);
            _self.render();
        });
    }
    statusWatching() {
        this._status.style.bg = 'blue';
        this._status.setContent('Watching...');
        this.render();
    }
    statusRunning() {
        this._status.style.bg = 'green';
        this._status.setContent('Running...');
        this.render();
    }
    statusFinished() {
        this._status.style.bg = 'red';
        this._status.setContent('Finished');
        this.render();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Screen;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getVideoFiles;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recursive_readdir__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recursive_readdir___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_recursive_readdir__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isVideo_js__ = __webpack_require__(2);



function getVideoFiles(path) {
    return new Promise(function (resolve, reject) {
        function ignoreFunc(file, stats) {
            if (stats.isDirectory()) return false;
            return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isVideo_js__["a" /* default */])(file);
        }
        __WEBPACK_IMPORTED_MODULE_0_fs___default.a.stat(path, (err, stats) => {
            if (err) return reject(err);
            if (stats.isFile() && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isVideo_js__["a" /* default */])(path)) {
                return resolve([path]);
            } else if (stats.isDirectory()) {
                __WEBPACK_IMPORTED_MODULE_1_recursive_readdir___default()(path, [ignoreFunc]).then(resolve, reject);
            } else {
                return reject(new Error('Unsupported file type.'));
            }
        });
    });
}
/* unused harmony default export */ var _unused_webpack_default_export = (getVideoFiles);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isVideo_js__ = __webpack_require__(2);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getVideoFiles_js__ = __webpack_require__(9);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__getVideoFiles_js__["a"]; });



/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("blessed");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("cli-spinners");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("figures");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("lodash.throttle");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("mime");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("nmmes-backend");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-autocrop");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-encoder");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-he-audio");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-normalize");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-sample");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-stats");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("node-noop");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("optional");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("recursive-readdir");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ })
/******/ ]);
});
//# sourceMappingURL=nmmes-cli.js.map