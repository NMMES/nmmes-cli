#!/bin/env node

require("source-map-support").install();
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("chalk"), require("blessed"), require("bluebird"), require("cli-spinners"), require("clui"), require("figures"), require("h265ize-backend"), require("h265ize-module-autocrop"), require("h265ize-module-encoder"), require("h265ize-module-he-audio"), require("h265ize-module-normalize"), require("h265ize-module-sample"), require("h265ize-module-stats"), require("lodash.merge"), require("lodash.throttle"), require("optional"), require("os"), require("path"), require("stream"), require("yargs"));
	else if(typeof define === 'function' && define.amd)
		define(["chalk", "blessed", "bluebird", "cli-spinners", "clui", "figures", "h265ize-backend", "h265ize-module-autocrop", "h265ize-module-encoder", "h265ize-module-he-audio", "h265ize-module-normalize", "h265ize-module-sample", "h265ize-module-stats", "lodash.merge", "lodash.throttle", "optional", "os", "path", "stream", "yargs"], factory);
	else if(typeof exports === 'object')
		exports["h265ize-cli"] = factory(require("chalk"), require("blessed"), require("bluebird"), require("cli-spinners"), require("clui"), require("figures"), require("h265ize-backend"), require("h265ize-module-autocrop"), require("h265ize-module-encoder"), require("h265ize-module-he-audio"), require("h265ize-module-normalize"), require("h265ize-module-sample"), require("h265ize-module-stats"), require("lodash.merge"), require("lodash.throttle"), require("optional"), require("os"), require("path"), require("stream"), require("yargs"));
	else
		root["h265ize-cli"] = factory(root["chalk"], root["blessed"], root["bluebird"], root["cli-spinners"], root["clui"], root["figures"], root["h265ize-backend"], root["h265ize-module-autocrop"], root["h265ize-module-encoder"], root["h265ize-module-he-audio"], root["h265ize-module-normalize"], root["h265ize-module-sample"], root["h265ize-module-stats"], root["lodash.merge"], root["lodash.throttle"], root["optional"], root["os"], root["path"], root["stream"], root["yargs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_24__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
	"name": "h265ize-cli",
	"version": "0.0.1",
	"description": "A command line interface front end for h265ize.",
	"author": "Ayrton Sparling",
	"license": "LGPL-3.0",
	"engines": {
		"node": ">=6.4.0"
	},
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"dev": "webpack --env=development --watch",
		"build": "webpack --define process.env.NODE_ENV=\"production\" --env=production --progress",
		"profile": "node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt"
	},
	"main": "dist.js",
	"dependencies": {
		"blessed": "^0.1.81",
		"bluebird": "^3.5.0",
		"chalk": "^1.1.3",
		"cli-spinners": "^1.0.0",
		"clui": "^0.3.1",
		"figures": "^2.0.0",
		"fs-extra": "^3.0.1",
		"lodash.merge": "^4.6.0",
		"lodash.throttle": "^4.1.1",
		"mime": "^1.3.6",
		"moment": "^2.18.1",
		"moment-duration-format": "^1.3.0",
		"optional": "^0.1.3",
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

module.exports = require("chalk");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_h265ize_backend__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_h265ize_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_h265ize_backend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chalk__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screen_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__options_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stream__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_stream__);

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








const heAudio = __webpack_require__(14);
const encoder = __webpack_require__(13);
const normalizer = __webpack_require__(15);
const autocrop = __webpack_require__(12);
const stats = __webpack_require__(17);
const sample = __webpack_require__(16);
__WEBPACK_IMPORTED_MODULE_1_h265ize_backend__["Logger"].stream = new __WEBPACK_IMPORTED_MODULE_6_stream__["PassThrough"]();

let video = new __WEBPACK_IMPORTED_MODULE_1_h265ize_backend__["Video"]({
    name: 'test',
    input: {
        path: input
    },
    output: {
        path: output
    },

    // Module order matters, the encoder should usually be last
    modules: [new normalizer(), new heAudio(), new autocrop(), new encoder({
        defaults: {
            video: {
                'c:{POS}': 'libx265',
                'pixel_format': 'yuv420p10le',
                'preset': 'slow'
            }
        }
    }), new stats(), new sample()]
});
let video2 = new __WEBPACK_IMPORTED_MODULE_1_h265ize_backend__["Video"]({
    name: 'test',
    input: {
        path: input
    },
    output: {
        path: output
    },

    // Module order matters, the encoder should usually be last
    modules: [new normalizer(), new heAudio(), new autocrop(), new encoder({
        defaults: {
            video: {
                'c:{POS}': 'libx265',
                'pixel_format': 'yuv420p10le'
            }
        }
    }), new stats(), new sample()]
});

let videos = [video, video2];

let items = videos.reduce((arr, video) => {
    let item = new __WEBPACK_IMPORTED_MODULE_3__screen_js__["a" /* Item */]({
        title: video.input.base,
        content: new __WEBPACK_IMPORTED_MODULE_3__screen_js__["b" /* List */](video.modules.reduce((arr, module) => {
            let item = new __WEBPACK_IMPORTED_MODULE_3__screen_js__["a" /* Item */]({
                title: module.displayName
            });
            module.once('start', () => item.state = 'active');
            module.once('stop', err => {
                if (err) {
                    item.state = 'failed';
                    item.error(err.message);
                } else {
                    item.state = 'completed';
                }
            });
            arr.push(item);
            return arr;
        }, []))
    });
    video.once('start', () => {
        item.state = 'active';
    });
    video.once('stop', err => {
        if (err) {
            item.state = 'failed';
            item.error = __WEBPACK_IMPORTED_MODULE_2_chalk___default.a.red(err.split('\n')[0]);
        } else {
            item.state = 'completed';
        }
    });
    arr.push(item);
    return arr;
}, []);

let list = new __WEBPACK_IMPORTED_MODULE_3__screen_js__["b" /* List */](items);
let screen = new __WEBPACK_IMPORTED_MODULE_3__screen_js__["c" /* default */](list, __WEBPACK_IMPORTED_MODULE_1_h265ize_backend__["Logger"].stream);

// video.start();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_yargs__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_yargs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_yargs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_optional__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_optional___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_optional__);






const userSettings = __WEBPACK_IMPORTED_MODULE_4_optional___default()(__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(process.cwd(), __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name + '-settings.json')) || {};

/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_3_yargs___default.a.usage('Usage: $0 [options] file|directory').options({
    'd': {
        alias: 'destination',
        default: userSettings['destination'] || __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(process.cwd(), 'h265'),
        describe: 'Folder where encoded files are output.',
        type: 'string',
        normalize: true,
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
    'as-preset': {
        default: userSettings['as-preset'] || 'none',
        describe: 'My personal presets. Descriptions of each preset\'s use and function can be found on the github page.',
        choices: ['anime', 'testing-ssim', 'none'],
        type: 'string',
        group: 'Video:'
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
        group: 'General:'
    },
    'video-bitrate': {
        default: userSettings['video-bitrate'] || 0,
        describe: 'Sets the video bitrate, set to 0 to use qp rate control instead of a target bitrate.',
        type: 'number',
        group: 'Video:'
    },
    'l': {
        alias: 'preview-length',
        default: userSettings['preview-length'] || 30000,
        describe: 'Milliseconds to encode in preview mode. Max is half the length of input video.',
        type: 'number',
        group: 'Advanced:'
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
    'o': {
        alias: 'override',
        default: userSettings['override'] || false,
        describe: 'Enable override mode. Allows conversion of videos that are already encoded by the hevc codec.',
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
    'multi-pass': {
        default: userSettings['mutli-pass'] || 0,
        describe: 'Enable multiple passes by the encoder. Must be greater than 1.',
        type: 'number',
        group: 'Video:'
    },
    'stats': {
        default: userSettings['stats'] || false,
        describe: 'Output a stats file containing stats for each video converted.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'v': {
        alias: 'verbose',
        default: userSettings['verbose'] || false,
        describe: 'Enables verbose mode. Prints extra information.',
        type: 'boolean',
        group: 'General:'
    },
    'watch': {
        default: userSettings['watch'] || '',
        describe: 'Watches a directory for new video files to be converted.',
        type: 'string',
        group: 'Advanced:'
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
        group: 'Advanced:'
    },
    'scale': {
        default: userSettings['scale'] || false,
        describe: 'Width videos should be scaled to. Videos will always maintain original aspect ratio. [Examples: 720, 480]',
        type: 'number',
        group: 'Video:'
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
    'help': {
        describe: 'Displays help page.',
        group: 'Options:'
    },
    'test': {
        default: userSettings['test'] || false,
        describe: 'Puts h265ize in test mode. No files will be encoded.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'version': {
        describe: 'Displays version information.',
        group: 'Options:'
    }
}).argv);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blessed__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blessed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_blessed__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_clui__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_clui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_clui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_merge__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cli_spinners__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cli_spinners___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cli_spinners__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_figures__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_figures___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_figures__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_throttle__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_throttle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_throttle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_chalk__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_chalk__);









var reqsPerSec = [10, 12, 3, 7, 12, 9, 23, 10, 9, 19, 16, 18, 12, 12];

const defaults = {
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

const THROTTLE = 80;

let program = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.program();
program.hideCursor();

class Screen extends __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.screen {
    constructor(videoList, logStream) {
        super({
            program,
            fastCSR: true
        });
        this.title = __WEBPACK_IMPORTED_MODULE_1__package_json___default.a.name;
        this.init(videoList, logStream);
    }
    init(videoList, logStream) {
        let _self = this;
        this.info = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.box(__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default()({}, defaults.box, {
            parent: this,
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            content: 'Waiting...',
            border: {
                type: 'bg'
            }
        }));

        this.log = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.box(__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default()({}, defaults.box, {
            parent: this,
            scrollable: true,
            scrollbar: {
                ch: ' ',
                inverse: true
            },
            mouse: true,
            right: 0,
            top: 0,
            bottom: this.info.height,
            width: '70%',
            content: ''
        }));
        this.log.on('scroll', this.render.bind(this));

        this.videoList = __WEBPACK_IMPORTED_MODULE_0_blessed___default.a.box(__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default()({}, defaults.box, {
            parent: this,
            scrollable: true,
            scrollbar: {
                ch: ' ',
                inverse: true
            },
            left: 0,
            top: 0,
            bottom: this.info.height,
            width: '30%',
            content: videoList.output
        }));
        videoList.onUpdate = () => {
            _self.videoList.setContent(videoList.output);
            _self.render();
        };

        this.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });
        this.render();

        logStream.on('data', buffer => {
            const scrolled = _self.log.getScroll() + _self.log.height;
            const height = _self.log.getScrollHeight();
            _self.log.pushLine(buffer.toString('utf8'));
            if (scrolled >= height) {
                _self.log.setScrollPerc(100);
            }
            _self.render();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Screen;


class Item {
    constructor(options) {
        this._state = 'pending';
        this._error = '';
        this.output = '';

        this.onUpdate = () => {};

        this.render = __WEBPACK_IMPORTED_MODULE_6_lodash_throttle___default()(() => {
            this.output = `${this.icon} ${this.title} ${this._error}`;
            if (this.content && (this._state === 'active' || this._state === 'failed')) {
                this.output += '\n   ' + this.content.output.replace(/\n/g, '\n   ');
            }
            this.onUpdate();
        }, THROTTLE);
        this.iconFrame = 0;

        Object.assign(this, options);
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
    set error(err) {
        this._error = err;
        this.render();
    }

    get icon() {
        let icon = '';
        if (this.iconFrame >= __WEBPACK_IMPORTED_MODULE_4_cli_spinners___default.a.dots.frames.length) this.iconFrame = 0;
        switch (this._state) {
            case 'active':
                icon = __WEBPACK_IMPORTED_MODULE_7_chalk___default.a.blue(__WEBPACK_IMPORTED_MODULE_4_cli_spinners___default.a.dots.frames[this.iconFrame++]);
                break;
            case 'completed':
                icon = __WEBPACK_IMPORTED_MODULE_5_figures___default.a.tick;
                break;
            case 'failed':
                icon = __WEBPACK_IMPORTED_MODULE_5_figures___default.a.cross;
                break;
            default:
                icon = '-';
                break;
        }
        return `${icon} `;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;


class List {
    constructor(items) {
        this.output = '';

        this.onUpdate = () => {};

        this.render = __WEBPACK_IMPORTED_MODULE_6_lodash_throttle___default()(() => {
            let _self = this;
            this.output = this.items.reduce((arr, item) => {
                item.onUpdate = () => {
                    _self.render();
                };
                arr.push(item.output);
                return arr;
            }, []).join('\n');
            this.onUpdate();
        }, THROTTLE);

        this.items = items;
        this.render();
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = List;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token, expected { (1:7)\n\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 1 | \u001b[39m\u001b[36mexport\u001b[39m isVideo from \u001b[32m'./isVideo.js'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m   | \u001b[39m       \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 2 | \u001b[39m\u001b[0m\n");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("blessed");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("cli-spinners");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("clui");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("figures");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("h265ize-backend");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("h265ize-module-autocrop");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("h265ize-module-encoder");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("h265ize-module-he-audio");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("h265ize-module-normalize");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("h265ize-module-sample");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("h265ize-module-stats");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("lodash.throttle");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("optional");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
});
//# sourceMappingURL=dist.js.map