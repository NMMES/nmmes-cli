#!/usr/bin/env node

require("source-map-support").install();
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("path"), require("fs"), require("nmmes-backend"), require("nmmes-module-he-audio"), require("nmmes-module-sample"), require("nmmes-module-normalize"), require("nmmes-module-encoder"), require("chalk"), require("lodash/merge"), require("os"), require("yargs"), require("git-rev-sync"), require("bluebird"), require("mime"), require("recursive-readdir"), require("is-url"), require("request-promise-native"), require("requireg"), require("nmmes-module-autocrop"));
	else if(typeof define === 'function' && define.amd)
		define(["path", "fs", "nmmes-backend", "nmmes-module-he-audio", "nmmes-module-sample", "nmmes-module-normalize", "nmmes-module-encoder", "chalk", "lodash/merge", "os", "yargs", "git-rev-sync", "bluebird", "mime", "recursive-readdir", "is-url", "request-promise-native", "requireg", "nmmes-module-autocrop"], factory);
	else if(typeof exports === 'object')
		exports["nmmes-cli"] = factory(require("path"), require("fs"), require("nmmes-backend"), require("nmmes-module-he-audio"), require("nmmes-module-sample"), require("nmmes-module-normalize"), require("nmmes-module-encoder"), require("chalk"), require("lodash/merge"), require("os"), require("yargs"), require("git-rev-sync"), require("bluebird"), require("mime"), require("recursive-readdir"), require("is-url"), require("request-promise-native"), require("requireg"), require("nmmes-module-autocrop"));
	else
		root["nmmes-cli"] = factory(root["path"], root["fs"], root["nmmes-backend"], root["nmmes-module-he-audio"], root["nmmes-module-sample"], root["nmmes-module-normalize"], root["nmmes-module-encoder"], root["chalk"], root["lodash/merge"], root["os"], root["yargs"], root["git-rev-sync"], root["bluebird"], root["mime"], root["recursive-readdir"], root["is-url"], root["request-promise-native"], root["requireg"], root["nmmes-module-autocrop"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_28__, __WEBPACK_EXTERNAL_MODULE_29__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("nmmes-backend");

/***/ }),
/* 3 */
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
		"test": "npm outdated --prod; depcheck; exit 0",
		"dev": "webpack --env=development --watch",
		"build": "webpack --define process.env.NODE_ENV=\"production\" --env=production --progress",
		"profile": "node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt",
		"preversion": "npm test",
		"version": "git add . && git commit -S",
		"postversion": "git push",
		"patch-release": "npm version patch && npm publish"
	},
	"main": "dist/nmmes-cli.js",
	"repository": {
		"type": "git",
		"url": "https://github.com/NMMES/nmmes-cli.git"
	},
	"dependencies": {
		"blessed": "^0.1.81",
		"bluebird": "^3.5.1",
		"chalk": "^2.1.0",
		"cli-spinners": "^1.1.0",
		"figures": "^2.0.0",
		"fs-extra": "^4.0.2",
		"git-rev-sync": "^1.9.1",
		"is-url": "^1.2.2",
		"lodash": "^4.17.4",
		"mime": "^2.0.3",
		"moment": "^2.19.0",
		"moment-duration-format": "^1.3.0",
		"node-noop": "^1.0.0",
		"recursive-readdir": "^2.2.1",
		"request": "^2.83.0",
		"request-promise-native": "^1.0.5",
		"requireg": "^0.1.7",
		"source-map-support": "^0.5.0",
		"yargs": "^9.0.1"
	},
	"devDependencies": {
		"babel-core": "^6.26.0",
		"babel-eslint": "^8.0.1",
		"babel-loader": "^7.1.2",
		"babel-plugin-lodash": "^3.2.11",
		"babel-plugin-module-resolver": "^2.7.1",
		"babel-preset-es2016": "^6.24.1",
		"babel-preset-stage-2": "^6.24.1",
		"babel-register": "^6.26.0",
		"babel-runtime": "^6.26.0",
		"depcheck": "^0.6.8",
		"eslint": "^4.8.0",
		"source-map-loader": "^0.2.2",
		"webpack": "^3.6.0",
		"webpack-node-externals": "^1.6.0"
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-he-audio");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-sample");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-normalize");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-encoder");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__video_js__ = __webpack_require__(19);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__video_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_js__ = __webpack_require__(23);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__profile_js__["a"]; });



/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
	"version": 1,
	"moduleOptions": {
		"nmmes-module-encoder": {
			"defaults": {
				"video": {
					"vf": "deband=r=32:1thr=0.01:2thr=0.01:3thr=0.01:4thr=0.01",
					"pixel_format": "yuv420p10le",
					"preset": "medium"
				}
			}
		}
	},
	"preset": "medium",
	"heAudio": true
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
	"version": 1,
	"moduleOptions": {
		"nmmes-module-encoder": {
			"defaults": {
				"video": {
					"pixel_format": "yuv420p",
					"preset": "medium"
				}
			}
		}
	},
	"preset": "medium",
	"heAudio": true
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__options_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chalk__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_nmmes_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_nmmes_backend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_requireg__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_requireg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_requireg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_fs__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

console.log('Loading...');








// Make sure log level is at default info
// Logger.setLevel('info');

let STOPREQ = false;

process.on('SIGINT', () => STOPREQ = true);

_asyncToGenerator(function* () {
    let options = yield Object(__WEBPACK_IMPORTED_MODULE_0__options_js__["a" /* default */])();

    if (options.debug) __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].setLevel('trace');

    __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].trace('Options:', options);

    let moduleClasses = {
        'nmmes-module-encoder': __webpack_require__(7)
    };

    if (options.heAudio) moduleClasses['nmmes-module-he-audio'] = __webpack_require__(4);
    if (options.normalize) moduleClasses['nmmes-module-normalize'] = __webpack_require__(6);
    if (options.sample) moduleClasses['nmmes-module-sample'] = __webpack_require__(5);
    if (options.autocrop) moduleClasses['nmmes-module-autocrop'] = __webpack_require__(29);

    try {
        Object.assign(moduleClasses, options.modules.reduce(function (modules, name) {
            const descriptor = `nmmes-module-${name}`;
            let module;
            try {
                module = __WEBPACK_IMPORTED_MODULE_4_requireg___default()(descriptor);
            } catch (e) {
                __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].debug(e);
                throw new Error(`Module ${descriptor} (${name}) was not found. Make sure ${descriptor} is installed.`);
            }

            modules[descriptor] = module;
            return modules;
        }, {}));
    } catch (e) {
        __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].error(e);
        return 1;
    }

    __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].debug(`Modules loaded: [${Object.keys(moduleClasses).join()}].`);

    let videos = (yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getPaths */](options._[0])).reduce(function (arr, path) {
        arr.push(new __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Video"]({
            input: {
                path
            },
            output: {
                path: __WEBPACK_IMPORTED_MODULE_5_path___default.a.resolve(options.tempDirectory, __WEBPACK_IMPORTED_MODULE_5_path___default.a.basename(path, __WEBPACK_IMPORTED_MODULE_5_path___default.a.extname(path)) + '.' + options.outputFormat)
            },
            modules: Object.entries(moduleClasses).map(function (modulePair) {
                let name = modulePair[0];
                let moduleClass = modulePair[1];

                return new moduleClass(options.moduleOptions);
            })
        }));
        return arr;
    }, []);

    if (videos.length > 1) __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].info('Videos found:\n\t-', videos.map(function (vid) {
        return __WEBPACK_IMPORTED_MODULE_2_chalk___default.a.yellow(__WEBPACK_IMPORTED_MODULE_5_path___default.a.relative(options._[0], vid.input.path));
    }).join('\n\t- '));

    for (let v of videos) {
        try {
            yield v.run();
        } catch (e) {
            __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].error(e);
            if (STOPREQ) {
                __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].warn('Stopping because SIGINT receieved.');
                break;
            }
        }
        if (__WEBPACK_IMPORTED_MODULE_6_fs___default.a.existsSync(v.output.path)) {
            let destination = __WEBPACK_IMPORTED_MODULE_5_path___default.a.resolve(options.destination, __WEBPACK_IMPORTED_MODULE_5_path___default.a.basename(v.output.path));
            __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].debug(`Moving ${__WEBPACK_IMPORTED_MODULE_2_chalk___default.a.bold(v.output.path)} -> ${__WEBPACK_IMPORTED_MODULE_2_chalk___default.a.bold(destination)}.`);
        }
    }

    __WEBPACK_IMPORTED_MODULE_3_nmmes_backend__["Logger"].info('Processing finished.');
})();

// getFlags(Options => {
//     // Set log level to trace if debug is enabled
//     if (Options.debug)
//         Logger.setLevel('trace');
//
//     let screen, videos = [],
//         killRequestCounter = 0;
//
//     Logger.stream = new PassThrough();
//
//     // Initialize user interface
//     if (!Options.simple) {
//         screen = new Screen();
//         screen.logStream = Logger.stream;
//         // console.oldLog = console.log;
//         // console.oldError = console.error;
//         console.log = function() {
//             // console.oldLog.apply(console, arguments);
//             Logger.log.apply(Logger, arguments);
//         }
//         console.error = function() {
//             // console.oldError.apply(console, arguments);
//             Logger.error.apply(Logger, arguments);
//         }
//
//         screen.key(['escape', 'q', 'C-c'], function() {
//             if (++killRequestCounter > 2) {
//                 Logger.error('Kill signal receieved more than 2 times, forcing process death... DIE ALREADY!');
//                 screen.destroy();
//                 process.kill(-process.pid, 'SIGKILL');
//             }
//             let videoWasRunning = false;
//             for (let video of videos) {
//                 if (video.running) {
//                     video.stop(new Error('STOPREQ: Video stopped by request of user.'));
//                     videoWasRunning = true;
//                 }
//             }
//
//             if (!videoWasRunning) {
//                 Logger.trace('Stop command receieved... Attempting to stop.');
//                 process.kill(-process.pid, 'SIGTERM');
//             }
//         });
//     }
//
//     if (typeof Options.logFile !== 'undefined') {
//         const logLocation = Path.resolve(Options.logFile, Package.name + '.log');
//         const fileLogStream = fs.createWriteStream(logLocation, {
//             flags: 'a'
//         });
//         Logger.stream.on('data', (buffer) => {
//             fileLogStream.write(stripAnsi(buffer.toString('utf8').trim()) + '\n');
//         });
//         Logger.log(`Logging output to ${logLocation}.`);
//     }
//
//     const heAudio = require('nmmes-module-he-audio');
//     const encoder = require('nmmes-module-encoder');
//     const normalizer = require('nmmes-module-normalize');
//     const autocrop = require('nmmes-module-autocrop');
//     const stats = require('nmmes-module-stats');
//     const sample = require('nmmes-module-sample');
//
//     // Logger.info(Options)
//     if (Options.watch) {
//         Logger.info('Watching directory ', chalk.bold(Options.watch) + '.');
//         Logger.error('Watch not implemented yet.');
//     } else {
//         Logger.info('Locating video file(s) at', chalk.bold(Options._[0]) + '.');
//         utils.getVideoFiles(Options._[0])
//             .then(createVideos)
//             .then(createVideoList)
//             .then((list) => {
//                 if (screen)
//                     screen.videoList = list;
//             })
//             .then(loop)
//             .then(() => {
//                 Logger.info('All videos completed processing!');
//             })
//             .catch((err) => {
//                 Logger.error(err.message);
//                 Logger.debug(err);
//             })
//             .then(() => {
//                 if (screen)
//                     screen.statusFinished();
//             });
//     }
//
//     function createVideos(paths) {
//         return new Promise(function(resolve, reject) {
//             Logger.debug(`Videos found [${paths.length}]:\n\t-`, paths.join('\n\t-'));
//             for (let path of paths) {
//
//                 let modules = [];
//                 if (Options.normalizeLevel >= 1) {
//                     modules.push(new autocrop());
//                 }
//                 if (Options.normalizeLevel >= 2) {
//                     modules.push(new normalizer(Options.moduleOptions['nmmes-module-normalize']));
//                 }
//
//                 // HE Audio
//                 if (Options.heAudio) {
//                     modules.push(new heAudio(Options.moduleOptions['nmmes-module-he-audio']));
//                 }
//
//                 // Encoder
//                 modules.push(new encoder(Options.moduleOptions['nmmes-module-encoder']));
//
//                 if (Options.stats)
//                     modules.push(new stats());
//
//                 // Sample
//                 if (Options.sample) {
//                     modules.push(new sample(Options.moduleOptions['nmmes-module-sample']));
//                 }
//
//                 if (Options.screenshots) {
//
//                 }
//
//                 let tempOutput = Path.format({
//                     dir: Options.tempDirectory,
//                     name: Path.parse(path).name,
//                     ext: '.' + Options.outputFormat
//                 });
//                 let finalOutput = Path.format({
//                     dir: Path.resolve(Options.destination, Path.dirname(Path.relative(Options._[0], path))),
//                     name: Path.parse(path).name,
//                     ext: '.' + Options.outputFormat
//                 });
//                 if (!Options.delete)
//                     if (fs.existsSync(finalOutput)) {
//                         Logger.warn('Output for', chalk.bold(Path.basename(path)), 'already exists at', chalk.bold(finalOutput) + '. Skipping...');
//                         continue;
//                     }
//                 videos.push(new Video({
//                     input: {
//                         path
//                     },
//                     output: {
//                         path: tempOutput
//                     },
//                     modules
//                 }));
//             }
//             resolve(videos);
//         });
//     }
//
//     function createVideoList(videos) {
//         return new Promise(function(resolve, reject) {
//             let items = videos.reduce((arr, video) => {
//                 let list = new List(video.modules.reduce((arr, module) => {
//                     let item = new Item({
//                         title: module.displayName
//                     });
//                     module.once('start', () => item.state = 'active');
//                     module.on('statusUpdate', status => item.status = status);
//                     module.once('stop', (err) => {
//                         module.removeListener('statusUpdate', status => item.status = status);
//                         if (err) {
//                             item.state = 'failed';
//                             item.error = err.message.split('\n')[0];
//                         } else {
//                             item.state = 'completed';
//                         }
//                     });
//                     arr.push(item);
//                     return arr;
//                 }, []));
//                 let item = new Item({
//                     title: video.input.base,
//                     content: list
//                 });
//                 video.once('start', () => {
//                     item.state = 'active';
//                 });
//                 video.once('stopped', (err) => {
//                     if (err) {
//                         item.state = 'failed';
//                         item.error = err.message.split('\n')[0];
//                     } else {
//                         let finalOutput = Path.format({
//                             dir: Path.resolve(Options.destination, Path.dirname(Path.relative(Options._[0], video.input.path))),
//                             name: Path.parse(video.input.path).name,
//                             ext: '.' + Options.outputFormat
//                         });
//                         Logger.info('Moving to final destination...', chalk.bold(finalOutput));
//                         fs.move(video.output.path, finalOutput, {
//                                 overwrite: Options.delete
//                             }).then(() => {
//                                 Logger.info('Move complete.');
//                                 item.state = 'completed';
//                             })
//                             .catch((err) => {
//                                 item.state = 'failed';
//                                 item.error = err.message;
//                             });
//                     }
//                 });
//                 video.on('module-stop', (module, err) => {
//                     if (module.tolerance !== 'required' && err) {
//                         item.state = 'warn';
//                     }
//                 });
//                 arr.push(item);
//                 return arr;
//             }, []);
//
//             resolve(new List(items));
//         });
//     }
//
//     function loop(i = 0) {
//         return new Promise(function(resolve, reject) {
//
//             if (i >= videos.length)
//                 return resolve();
//
//             videos[i].once('stopped', (err) => {
//                 if (err && err.message.startsWith('STOPREQ')) return reject(err);
//                 loop(++i).then(resolve, reject);
//             }).start();
//
//             screen.statusRunning();
//         });
//     }
// });

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export userSetOption */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_os__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__package_json__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_yargs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_yargs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_yargs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_git_rev_sync__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_git_rev_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_git_rev_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_nmmes_module_he_audio__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_nmmes_module_he_audio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_nmmes_module_he_audio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_nmmes_module_sample__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_nmmes_module_sample___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_nmmes_module_sample__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_nmmes_module_normalize__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_nmmes_module_normalize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_nmmes_module_normalize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_nmmes_module_encoder__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_nmmes_module_encoder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_nmmes_module_encoder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_nmmes_backend__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_nmmes_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_nmmes_backend__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }















const options = {
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
        default: __WEBPACK_IMPORTED_MODULE_1_path___default.a.resolve(__WEBPACK_IMPORTED_MODULE_2_os___default.a.tmpdir(), __WEBPACK_IMPORTED_MODULE_3__package_json___default.a.name),
        describe: 'Folder where files are stored during encoding.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'd': {
        alias: 'destination',
        default: __WEBPACK_IMPORTED_MODULE_1_path___default.a.resolve(process.cwd(), 'nmmes-out'),
        describe: 'Folder where encoded files are output.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'skip': {
        describe: 'Skips videos already encoded with a specific codec.',
        type: 'string',
        group: 'General:'
    },
    'p': {
        alias: 'preview',
        default: false,
        describe: 'Only encode a preview of the video starting at middle of video. See -l/--preview-length for more info.',
        type: 'boolean',
        group: 'General:'
    },
    'log-file': {
        default: '',
        describe: 'Sets the log file location for all output from h265ize.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'm': {
        alias: 'preset',
        default: 'fast',
        describe: 'x265 encoder preset.',
        choices: ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow', 'placebo'],
        type: 'string',
        group: 'General:'
    },
    'n': {
        alias: 'native-language',
        default: __WEBPACK_IMPORTED_MODULE_9_nmmes_module_normalize___default.a.defaults().language,
        describe: 'The native language used to select default audio and subtitles. You may use 3 letter or 2 letter ISO 639-2 Alpha-3/Alpha-2 codes or the full language name. Examples: [eng|en|English|jpn|ja|Japanese]',
        type: 'string',
        group: 'General:'
    },
    'f': {
        alias: 'output-format',
        default: 'mkv',
        describe: 'Output container format.',
        choices: ['mkv', 'mp4', 'm4v'],
        type: 'string',
        group: 'General:'
    },
    'c': {
        alias: 'video-codec',
        default: __WEBPACK_IMPORTED_MODULE_10_nmmes_module_encoder___default.a.defaults().defaults.video['c:{POS}'],
        describe: 'Video codec to encode the video to.',
        choices: ['libx264', 'libx265'],
        type: 'string',
        group: 'Video:'
    },
    'profile': {
        default: 'none',
        describe: 'My personal presets. Descriptions of each preset\'s use and function can be found on the github wiki.',
        type: 'string',
        group: 'Video:'
    },
    // 'x': {
    //     alias: 'extra-options',
    //     default: '',
    //     describe: 'Options provided directly to the encoder.',
    //     type: 'string',
    //     group: 'Advanced:'
    // },
    'q': {
        alias: 'quality',
        default: 19,
        describe: 'Sets the qp quality target',
        type: 'number',
        group: 'Video:'
    },
    // 'video-bitrate': {
    //     default: 0,
    //     describe: 'Sets the video bitrate, set to 0 to use qp rate control instead of a target bitrate.',
    //     type: 'number',
    //     group: 'Video:'
    // },
    // 'accurate-timestamps': {
    //     default: false,
    //     describe: 'Become blu-ray complient and reduce the max keyInt to the average frame rate.',
    //     type: 'boolean',
    //     group: 'Video:'
    // },
    'he-audio': {
        default: false,
        describe: `Re-encode audio to opus at ${__WEBPACK_IMPORTED_MODULE_7_nmmes_module_he_audio___default.a.defaults().bitratePerChannel}kbps/channel.`,
        type: 'boolean',
        group: 'Audio:'
    },
    'force-he-audio': {
        default: __WEBPACK_IMPORTED_MODULE_7_nmmes_module_he_audio___default.a.defaults().encodeLossless,
        describe: 'Convert all audio to HE format, including lossless formats. Enables he-audio.',
        type: 'boolean',
        group: 'Audio:'
    },
    'downmix-he-audio': {
        default: __WEBPACK_IMPORTED_MODULE_7_nmmes_module_he_audio___default.a.defaults().downmix,
        describe: `Downmix he-audio opus to Dolby Pro Logic II at ${__WEBPACK_IMPORTED_MODULE_7_nmmes_module_he_audio___default.a.defaults().bitratePerChannel}kbps/channel. Enables he-audio.`,
        type: 'boolean',
        group: 'Audio:'
    },
    // 'multi-pass': {
    //     default: 0,
    //     describe: 'Enable multiple passes by the encoder. Must be greater than 1.',
    //     type: 'number',
    //     group: 'Video:'
    // },
    'bitdepth': {
        default: 0,
        describe: 'Forces encoding videos at a specific bitdepth. Set to 0 to maintain original bitdepth.',
        type: 'number',
        group: 'Video:'
    },
    'screenshots': {
        default: 0,
        describe: 'Take n screenshots at regular intervals throughout the finished encode.',
        type: 'number',
        group: 'Video:'
    },
    'normalize-level': {
        default: 2,
        describe: 'Level of normalization to be applied. See https://github.com/FallingSnow/h265ize/issues/56 for more info.',
        type: 'number',
        group: 'Video:'
    },
    'scale': {
        default: 0,
        describe: 'Width videos should be scaled to. Videos will always maintain original aspect ratio. [Examples: 720, 480]',
        type: 'number',
        group: 'Video:'
    },
    'stats': {
        default: false,
        describe: 'Output a stats file containing stats to this destination.',
        type: 'string',
        group: 'Advanced:'
    },
    'debug': {
        default: false,
        describe: 'Enables debug mode. Prints extra debugging information.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'delete': {
        default: false,
        describe: 'Delete source after encoding is complete and replaces it with new encode. [DANGER]',
        type: 'boolean',
        group: 'Advanced:'
    },
    'l': {
        alias: 'preview-length',
        default: __WEBPACK_IMPORTED_MODULE_8_nmmes_module_sample___default.a.defaults().length,
        describe: 'Milliseconds to encode in preview mode. Max is half the length of input video.',
        type: 'number',
        group: 'Advanced:'
    },
    // 'watch': {
    //     default: '',
    //     describe: 'Watches a directory for new video files to be converted.',
    //     type: 'string',
    //     group: 'Advanced:'
    // },
    'simple': {
        default: false,
        describe: 'Disables the interface. Simply prints to the terminal.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'modules': {
        default: [],
        describe: 'A list of modules to import.',
        type: 'array',
        group: 'Advanced:'
    },
    'test': {
        default: false,
        describe: 'Puts nmmes in test mode. No files will be encoded.',
        type: 'boolean',
        group: 'Advanced:'
    }
};
let args = __WEBPACK_IMPORTED_MODULE_4_yargs___default.a.usage('Usage: $0 [options] file|directory').options(options).argv;

const yargAliases = __WEBPACK_IMPORTED_MODULE_4_yargs___default.a.choices().parsed.aliases;

if (args.help || args._.length < 1 && !args.watch) {
    console.log('Package:', __WEBPACK_IMPORTED_MODULE_3__package_json___default.a.name, '\t', 'Version:', __WEBPACK_IMPORTED_MODULE_3__package_json___default.a.version);
    console.log('Description:', __WEBPACK_IMPORTED_MODULE_3__package_json___default.a.description);
    __WEBPACK_IMPORTED_MODULE_4_yargs___default.a.showHelp();
    process.exit();
} else if (args.version) {
    try {
        console.log(__WEBPACK_IMPORTED_MODULE_3__package_json___default.a);
        if (__WEBPACK_IMPORTED_MODULE_6_fs___default.a.existsSync('node_modules')) {
            let path = __WEBPACK_IMPORTED_MODULE_1_path___default.a.resolve(__WEBPACK_IMPORTED_MODULE_6_fs___default.a.realpathSync('node_modules'), '../');
            console.log(__WEBPACK_IMPORTED_MODULE_3__package_json___default.a.name, __WEBPACK_IMPORTED_MODULE_5_git_rev_sync___default.a.branch(path) + '#' + __WEBPACK_IMPORTED_MODULE_5_git_rev_sync___default.a.short(path));
        }
    } catch (e) {
        console.log(e);
        console.log(__WEBPACK_IMPORTED_MODULE_3__package_json___default.a.name, __WEBPACK_IMPORTED_MODULE_3__package_json___default.a.version);
    }
    process.exit();
}

function explicitFlags() {
    let flags = {};
    for (let option of Object.keys(args)) {
        if (userSetOption(option, false)) flags[option] = args[option];
    }
    return flags;
}

function userSetOption(option, aliases = true) {
    function searchForOption(option) {
        return ~process.argv.indexOf(option);
    }

    if (searchForOption(`-${option}`) || searchForOption(`--${option}`)) return true;

    // Handle aliases for same option
    if (aliases) for (let aliasIndex in yargAliases[option]) {
        let alias = yargAliases[option][aliasIndex];
        if (searchForOption(`-${alias}`) || searchForOption(`--${alias}`)) return true;
    }

    return false;
}

function flagsToModuleOptions(flags) {
    let moduleOptions = {
        'nmmes-module-encoder': {
            defaults: {
                video: {
                    vf: []
                }
            }
        },
        'nmmes-module-normalize': {},
        'nmmes-module-he-audio': {},
        'nmmes-module-sample': {}
    };
    if (flags.videoCodec) moduleOptions['nmmes-module-encoder'].defaults.video['c:{POS}'] = flags.videoCodec;
    if (flags.bitdepth) {
        if (flags.bitdepth === 8) {
            moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p';
        } else if (flags.bitdepth === 10) {
            moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p10le';
        } else if (flags.bitdepth === 12) {
            moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p12le';
        }
    }
    if (flags.scale) moduleOptions['nmmes-module-encoder'].defaults.video.vf.push(`scale=${flags.scale}:-2`);
    if (flags.preset) moduleOptions['nmmes-module-encoder'].defaults.video.preset = flags.preset;
    if (flags.quality) moduleOptions['nmmes-module-encoder'].defaults.video.crf = flags.quality;
    if (flags.preview) {
        moduleOptions['nmmes-module-encoder'].defaults.video.t = flags.previewLength / 1000;
    }
    if (flags.nativeLangage) moduleOptions['nmmes-module-normalize'].language = flags.nativeLangage;
    if (flags.forceHeAudio) moduleOptions['nmmes-module-he-audio'].force = flags.forceHeAudio;
    if (flags.downmixHeAudio) moduleOptions['nmmes-module-he-audio'].downmix = flags.downmixHeAudio;
    if (flags.previewLength) moduleOptions['nmmes-module-sample'].length = flags.previewLength;

    return moduleOptions;
}

function applyAliases(flags) {
    for (let flag of Object.keys(flags)) {
        for (let aliasIndex in yargAliases[flag]) {
            let alias = yargAliases[flag][aliasIndex];
            flags[alias] = flags[flag];
        }
    }
    return flags;
}

/* harmony default export */ __webpack_exports__["a"] = ((() => {
    var _ref = _asyncToGenerator(function* () {
        const profile = yield Object(__WEBPACK_IMPORTED_MODULE_11__utils__["b" /* getProfile */])(args.profile);
        let options = Object.assign(args, applyAliases(profile), applyAliases(explicitFlags()));
        __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()(options, {
            moduleOptions: flagsToModuleOptions(options)
        });
        return options;
    });

    function flags() {
        return _ref.apply(this, arguments);
    }

    return flags;
})());

__WEBPACK_IMPORTED_MODULE_12_nmmes_backend__["Logger"].trace('Options parser loaded.');

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("lodash/merge");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("git-rev-sync");

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPaths; });
/* unused harmony export isVideo */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mime__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mime__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




const recursive = __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a.promisify(__webpack_require__(22));
const fs = __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a.promisifyAll(__webpack_require__(1));

let getPaths = (() => {
    var _ref = _asyncToGenerator(function* (path) {
        function ignoreFunc(file, stats) {
            if (stats.isDirectory()) return false;
            return !isVideo(file);
        }
        let stats = yield fs.statAsync(path);

        if (stats.isFile() && isVideo(path)) {
            return [path];
        } else if (stats.isDirectory()) {
            return recursive(path, [ignoreFunc]);
        } else {
            throw new Error('Unsupported file type.');
        }
    });

    return function getPaths(_x) {
        return _ref.apply(this, arguments);
    };
})();

const SUPPORTED_EXTENSIONS = ['.m2ts'];

function isVideo(path) {
    const ext = __WEBPACK_IMPORTED_MODULE_1_path___default.a.extname(path);
    return __WEBPACK_IMPORTED_MODULE_2_mime___default.a.getType(ext).startsWith('video/') || ~SUPPORTED_EXTENSIONS.indexOf(ext);
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("mime");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("recursive-readdir");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export localProfiles */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_url__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_is_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request_promise_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request_promise_native___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_request_promise_native__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_nmmes_backend__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_nmmes_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_nmmes_backend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__package_json__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chalk__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_chalk__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }









function localProfiles() {
    let profiles = __webpack_require__(26).keys();
    for (let idx in profiles) {
        profiles[idx] = __WEBPACK_IMPORTED_MODULE_3_path___default.a.basename(profiles[idx], '.json');
    }
    return profiles;
}

let getProfile = (() => {
    var _ref = _asyncToGenerator(function* (profileLocation) {
        if (profileLocation === '') {
            throw new Error('No profile provided.');
        }
        if (!profileLocation || profileLocation === 'none') return {};

        if (~localProfiles().indexOf(profileLocation)) {
            let profile = __webpack_require__(27)("./" + profileLocation + '.json');
            return profile;
        }

        if (__WEBPACK_IMPORTED_MODULE_0_is_url___default()(profileLocation)) return yield __WEBPACK_IMPORTED_MODULE_1_request_promise_native___default()({ uri: profileLocation, json: true });

        if (__WEBPACK_IMPORTED_MODULE_2_fs___default.a.existsSync(profileLocation)) {
            return __WEBPACK_IMPORTED_MODULE_2_fs___default.a.readFile(profileLocation, function (err, data) {
                if (err) throw err;
                return JSON.parse(data);
            });
        }

        __WEBPACK_IMPORTED_MODULE_4_nmmes_backend__["Logger"].info('Availiable local profiles are:', localProfiles().join(', '));
        __WEBPACK_IMPORTED_MODULE_4_nmmes_backend__["Logger"].info(`You may activate a profile via it's local name or a url to a profile json file.`);
        __WEBPACK_IMPORTED_MODULE_4_nmmes_backend__["Logger"].info(`Examples:
\t${__WEBPACK_IMPORTED_MODULE_5__package_json___default.a.name} --profile anime my/movies/folder
\t${__WEBPACK_IMPORTED_MODULE_5__package_json___default.a.name} --profile https://raw.githubusercontent.com/NMMES/nmmes-cli/master/src/profiles/anime.json my/movies/folder`);
        throw new Error(`Profile ${profileLocation} not found.`);
    });

    return function getProfile(_x) {
        return _ref.apply(this, arguments);
    };
})();

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("is-url");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./anime-10bit.json": 10,
	"./anime.json": 11
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 26;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./anime-10bit.json": 10,
	"./anime.json": 11
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 27;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("requireg");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("nmmes-module-autocrop");

/***/ })
/******/ ]);
});
//# sourceMappingURL=nmmes-cli.js.map