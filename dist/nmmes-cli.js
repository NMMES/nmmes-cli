#!/usr/bin/env node

require("source-map-support").install();
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["nmmes-cli"] = factory();
	else
		root["nmmes-cli"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {"version":1,"moduleOptions":{"nmmes-module-encoder":{"defaults":{"video":{"vf":"deband=r=32:1thr=0.01:2thr=0.01:3thr=0.01:4thr=0.01","pixel_format":"yuv420p10le","preset":"medium"}}}},"preset":"medium","heAudio":true}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"version":1,"moduleOptions":{"nmmes-module-encoder":{"defaults":{"video":{"pixel_format":"yuv420p","preset":"medium"}}}},"preset":"medium","heAudio":true}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("nmmes-backend");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVideoPaths", function() { return getVideoPaths; });
/* harmony export (immutable) */ __webpack_exports__["isVideo"] = isVideo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__options_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nmmes_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nmmes_backend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs_extra__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs_extra___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fs_extra__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mime__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_mime__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }







// Make sure log level is at default info
// Logger.setLevel('info');

let STOPREQ = false;

process.on('SIGINT', () => STOPREQ = true);

_asyncToGenerator(function* () {
    let options;
    try {
        options = yield Object(__WEBPACK_IMPORTED_MODULE_0__options_js__["a" /* default */])();
    } catch (e) {
        __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].error(e.message);
        __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].debug(e);
        process.exit(1);
    }

    let args = options.args,
        modules = options.modules;

    if (options.args.debug) __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].setLevel('trace');

    __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].trace('Options:', options.args);

    let videos = (yield getVideoPaths(args._[0])).reduce(function (arr, path) {
        const outputBase = __WEBPACK_IMPORTED_MODULE_3_path___default.a.basename(path, __WEBPACK_IMPORTED_MODULE_3_path___default.a.extname(path)) + '.' + args.outputFormat;
        const outputPath = __WEBPACK_IMPORTED_MODULE_3_path___default.a.resolve(args.tempDirectory, outputBase);
        arr.push(new __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Video"]({
            input: {
                path
            },
            output: {
                path: outputPath
            },
            modules: Object.entries(modules).map(function (modulePair) {
                let name = modulePair[0];
                let moduleClass = modulePair[1];

                return new moduleClass();
            })
        }));
        return arr;
    }, []);

    if (videos.length > 1) __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].info('Videos found:\n\t-', videos.map(function (vid) {
        return __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.yellow(__WEBPACK_IMPORTED_MODULE_3_path___default.a.relative(options._[0], vid.input.path));
    }).join('\n\t- '));

    for (let v of videos) {
        try {
            yield v.run();

            if (yield __WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.exists(v.output.path)) {
                const relativeDirToInput = __WEBPACK_IMPORTED_MODULE_3_path___default.a.dirname(__WEBPACK_IMPORTED_MODULE_3_path___default.a.relative(options._[0], v.input.path));
                const relativeDestinationDir = __WEBPACK_IMPORTED_MODULE_3_path___default.a.resolve(options.destination, relativeDirToInput);
                const destination = __WEBPACK_IMPORTED_MODULE_3_path___default.a.resolve(relativeDestinationDir, __WEBPACK_IMPORTED_MODULE_3_path___default.a.basename(v.output.path));

                __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].trace(`Creating destination directory ${relativeDestinationDir}.`);
                yield __WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.ensureDir(relativeDestinationDir);

                __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].debug(`Moving ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(v.output.path)} -> ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(destination)}... Wait for completion message.`);
                __WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.move(v.output.path, destination).then(function () {
                    return __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].debug(`Moved ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(v.output.path)} -> ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(destination)}.`);
                }, function (err) {
                    throw err;
                });
            }
        } catch (e) {
            __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].error(e);
            if (STOPREQ) {
                __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].warn('Stopping because SIGINT receieved.');
                break;
            }
        }
    }

    __WEBPACK_IMPORTED_MODULE_2_nmmes_backend__["Logger"].info('Processing finished.');
})();



const recursive = __WEBPACK_IMPORTED_MODULE_5_bluebird___default.a.promisify(__webpack_require__(22));

let getVideoPaths = (() => {
    var _ref2 = _asyncToGenerator(function* (path) {
        function ignoreFunc(file, stats) {
            if (stats.isDirectory()) return false;
            return !isVideo(file);
        }
        let stats = yield __WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.stat(path);

        if (stats.isFile() && isVideo(path)) {
            return [path];
        } else if (stats.isDirectory()) {
            return recursive(path, [ignoreFunc]);
        } else {
            throw new Error('Unsupported file type.');
        }
    });

    return function getVideoPaths(_x) {
        return _ref2.apply(this, arguments);
    };
})();

const SUPPORTED_EXTENSIONS = ['.m2ts'];

function isVideo(path) {
    const ext = __WEBPACK_IMPORTED_MODULE_3_path___default.a.extname(path);
    if (!ext) return false;
    return __WEBPACK_IMPORTED_MODULE_6_mime___default.a.getType(ext).startsWith('video/') || ~SUPPORTED_EXTENSIONS.indexOf(ext);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getVersion */
/* unused harmony export localProfiles */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_yargs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_yargs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_yargs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_git_rev_sync__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_git_rev_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_git_rev_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_requireg__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_requireg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_requireg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_npmi__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_npmi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_npmi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_nmmes_backend__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_nmmes_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_nmmes_backend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_is_url__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_is_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_is_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_request_promise_native__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_request_promise_native___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_request_promise_native__);
let loadModules = (() => {
    var _ref2 = _asyncToGenerator(function* (modules) {
        let loadedModules = {};

        for (let module of modules) {
            let mName = `nmmes-module-${module}`;
            loadedModules[module] = yield requireModule(mName);
        }
        return loadedModules;
    });

    return function loadModules(_x) {
        return _ref2.apply(this, arguments);
    };
})();

let requireModule = (() => {
    var _ref3 = _asyncToGenerator(function* (name) {
        const path = __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(moduleDir, 'node_modules', name));
        try {
            return __WEBPACK_IMPORTED_MODULE_6_requireg___default()(path);
        } catch (e) {
            __WEBPACK_IMPORTED_MODULE_9_nmmes_backend__["Logger"].info(`Attempting to install ${name}`);
            yield npmip({
                path: moduleDir,
                name
            });
            return __WEBPACK_IMPORTED_MODULE_6_requireg___default()(path);
        }
    });

    return function requireModule(_x2) {
        return _ref3.apply(this, arguments);
    };
})();

let extractModuleOptions = (() => {
    var _ref4 = _asyncToGenerator(function* (modules) {
        let options = {};
        for (let [mName, mod] of Object.entries(modules)) {
            let ops = mod.options();
            for (let name of Object.keys(ops)) {
                Object.defineProperty(ops, `${mName}-${name}`, Object.getOwnPropertyDescriptor(ops, name));
                delete ops[name];
            }
            Object.assign(options, ops);
        }
        return options;
    });

    return function extractModuleOptions(_x3) {
        return _ref4.apply(this, arguments);
    };
})();

let getProfile = (() => {
    var _ref5 = _asyncToGenerator(function* (profileLocation) {
        if (profileLocation === 'none') return {};

        if (~localProfiles().indexOf(profileLocation)) {
            __WEBPACK_IMPORTED_MODULE_9_nmmes_backend__["Logger"].trace(`Built in profile "${profileLocation}" found!`);
            let profile = __webpack_require__(8)("./" + profileLocation + '.json');
            return profile;
        }

        if (__WEBPACK_IMPORTED_MODULE_10_is_url___default()(profileLocation)) try {
            return yield __WEBPACK_IMPORTED_MODULE_11_request_promise_native___default()({
                uri: profileLocation,
                json: true
            });
        } catch (e) {
            throw new Error(`Error retreiving profile: ${e.message}`);
        }

        if (__WEBPACK_IMPORTED_MODULE_5_fs___default.a.existsSync(profileLocation)) {
            return __WEBPACK_IMPORTED_MODULE_5_fs___default.a.readFile(profileLocation, function (err, data) {
                if (err) throw err;
                return JSON.parse(data);
            });
        }

        __WEBPACK_IMPORTED_MODULE_9_nmmes_backend__["Logger"].info('Availiable local profiles are:', localProfiles().join(', '));
        __WEBPACK_IMPORTED_MODULE_9_nmmes_backend__["Logger"].info(`You may activate a profile via it's local name or a url to a profile json file.`);
        __WEBPACK_IMPORTED_MODULE_9_nmmes_backend__["Logger"].info(`Examples:
\t${__WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name} --profile anime my/movies/folder
\t${__WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name} --profile https://raw.githubusercontent.com/NMMES/nmmes-cli/master/src/profiles/anime.json`);
        throw new Error(`Profile ${profileLocation} not found.`);
    });

    return function getProfile(_x4) {
        return _ref5.apply(this, arguments);
    };
})();

// const options = {
//     'version': {
//         describe: 'Displays version information.',
//         group: 'General:',
//         type: 'boolean',
//         default: false
//     },
//     'help': {
//         describe: 'Displays help page.',
//         group: 'General:',
//         type: 'boolean',
//         default: false
//     },
//     'g': {
//         alias: 'temp-directory',
//         default: Path.resolve(os.tmpdir(), Package.name),
//         describe: 'Folder where files are stored during encoding.',
//         type: 'string',
//         normalize: true,
//         group: 'General:'
//     },

//     'skip': {
//         describe: 'Skips videos already encoded with a specific codec.',
//         type: 'string',
//         group: 'General:'
//     },
//     'p': {
//         alias: 'preview',
//         default: false,
//         describe: 'Only encode a preview of the video starting at middle of video. See -l/--preview-length for more info.',
//         type: 'boolean',
//         group: 'General:'
//     },
//     'log-file': {
//         default: '',
//         describe: 'Sets the log file location for all output from h265ize.',
//         type: 'string',
//         normalize: true,
//         group: 'General:'
//     },
//     'm': {
//         alias: 'preset',
//         default: 'fast',
//         describe: 'x265 encoder preset.',
//         choices: ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow', 'placebo'],
//         type: 'string',
//         group: 'General:'
//     },
//     'n': {
//         alias: 'native-language',
//         default: normalizer.defaults().language,
//         describe: 'The native language used to select default audio and subtitles. You may use 3 letter or 2 letter ISO 639-2 Alpha-3/Alpha-2 codes or the full language name. Examples: [eng|en|English|jpn|ja|Japanese]',
//         type: 'string',
//         group: 'General:'
//     },

//     'c': {
//         alias: 'video-codec',
//         default: encoder.defaults().defaults.video['c:{POS}'],
//         describe: 'Video codec to encode the video to.',
//         choices: ['libx264', 'libx265'],
//         type: 'string',
//         group: 'Video:'
//     },
//     'profile': {
//         default: 'none',
//         describe: 'My personal presets. Descriptions of each preset\'s use and function can be found on the github wiki.',
//         type: 'string',
//         group: 'Video:'
//     },
//     // 'x': {
//     //     alias: 'extra-options',
//     //     default: '',
//     //     describe: 'Options provided directly to the encoder.',
//     //     type: 'string',
//     //     group: 'Advanced:'
//     // },
//     'q': {
//         alias: 'quality',
//         default: 19,
//         describe: 'Sets the qp quality target',
//         type: 'number',
//         group: 'Video:'
//     },
//     // 'video-bitrate': {
//     //     default: 0,
//     //     describe: 'Sets the video bitrate, set to 0 to use qp rate control instead of a target bitrate.',
//     //     type: 'number',
//     //     group: 'Video:'
//     // },
//     // 'accurate-timestamps': {
//     //     default: false,
//     //     describe: 'Become blu-ray complient and reduce the max keyInt to the average frame rate.',
//     //     type: 'boolean',
//     //     group: 'Video:'
//     // },
//     'he-audio': {
//         default: false,
//         describe: `Re-encode audio to opus at ${heAudio.defaults().bitratePerChannel}kbps/channel.`,
//         type: 'boolean',
//         group: 'Audio:'
//     },
//     'force-he-audio': {
//         default: heAudio.defaults().encodeLossless,
//         describe: 'Convert all audio to HE format, including lossless formats. Enables he-audio.',
//         type: 'boolean',
//         group: 'Audio:'
//     },
//     'downmix-he-audio': {
//         default: heAudio.defaults().downmix,
//         describe: `Downmix he-audio opus to Dolby Pro Logic II at ${heAudio.defaults().bitratePerChannel}kbps/channel. Enables he-audio.`,
//         type: 'boolean',
//         group: 'Audio:'
//     },
//     // 'multi-pass': {
//     //     default: 0,
//     //     describe: 'Enable multiple passes by the encoder. Must be greater than 1.',
//     //     type: 'number',
//     //     group: 'Video:'
//     // },
//     'bitdepth': {
//         default: 0,
//         describe: 'Forces encoding videos at a specific bitdepth. Set to 0 to maintain original bitdepth.',
//         type: 'number',
//         group: 'Video:'
//     },
//     'screenshots': {
//         default: 0,
//         describe: 'Take n screenshots at regular intervals throughout the finished encode.',
//         type: 'number',
//         group: 'Video:'
//     },
//     'normalize-level': {
//         default: 2,
//         describe: 'Level of normalization to be applied. See https://github.com/FallingSnow/h265ize/issues/56 for more info.',
//         type: 'number',
//         group: 'Video:'
//     },
//     'scale': {
//         default: 0,
//         describe: 'Width videos should be scaled to. Videos will always maintain original aspect ratio. [Examples: 720, 480]',
//         type: 'number',
//         group: 'Video:'
//     },
//     'stats': {
//         default: false,
//         describe: 'Output a stats file containing stats to this destination.',
//         type: 'string',
//         group: 'Advanced:'
//     },
//     'debug': {
//         default: false,
//         describe: 'Enables debug mode. Prints extra debugging information.',
//         type: 'boolean',
//         group: 'Advanced:'
//     },
//     'delete': {
//         default: false,
//         describe: 'Delete source after encoding is complete and replaces it with new encode. [DANGER]',
//         type: 'boolean',
//         group: 'Advanced:'
//     },
//     'l': {
//         alias: 'preview-length',
//         default: sample.defaults().length,
//         describe: 'Milliseconds to encode in preview mode. Max is half the length of input video.',
//         type: 'number',
//         group: 'Advanced:'
//     },
//     // 'watch': {
//     //     default: '',
//     //     describe: 'Watches a directory for new video files to be converted.',
//     //     type: 'string',
//     //     group: 'Advanced:'
//     // },
//     'simple': {
//         default: false,
//         describe: 'Disables the interface. Simply prints to the terminal.',
//         type: 'boolean',
//         group: 'Advanced:'
//     },
//     'modules': {
//         default: [],
//         describe: 'A list of modules to import.',
//         type: 'array',
//         group: 'Advanced:'
//     },
//     'test': {
//         default: false,
//         describe: 'Puts nmmes in test mode. No files will be encoded.',
//         type: 'boolean',
//         group: 'Advanced:'
//     },
// };
// let args = yargs
//     .version(false)
//     .help(false)
//     .usage('Usage: $0 [options] file|directory')
//     .options(options).argv;
//
// const yargAliases = yargs.choices().parsed.aliases;
//
//
// function explicitFlags() {
//     let flags = {};
//     for (let option of Object.keys(args)) {
//         if (userSetOption(option, false)) flags[option] = args[option];
//     }
//     return flags;
// }
//
// export function userSetOption(option, aliases = true) {
//     function searchForOption(option) {
//         return ~process.argv.indexOf(option);
//     }
//
//     if (searchForOption(`-${option}`) || searchForOption(`--${option}`))
//         return true;
//
//     // Handle aliases for same option
//     if (aliases)
//         for (let aliasIndex in yargAliases[option]) {
//             let alias = yargAliases[option][aliasIndex];
//             if (searchForOption(`-${alias}`) || searchForOption(`--${alias}`))
//                 return true;
//         }
//
//     return false;
// }
//
// function flagsToModuleOptions(flags) {
//     let moduleOptions = {
//         'nmmes-module-encoder': {
//             defaults: {
//                 video: {
//                     vf: []
//                 }
//             }
//         },
//         'nmmes-module-normalize': {},
//         'nmmes-module-he-audio': {},
//         'nmmes-module-sample': {},
//     };
//     if (flags.videoCodec) moduleOptions['nmmes-module-encoder'].defaults.video['c:{POS}'] = flags.videoCodec;
//     if (flags.bitdepth) {
//         if (flags.bitdepth === 8) {
//             moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p';
//         } else if (flags.bitdepth === 10) {
//             moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p10le';
//         } else if (flags.bitdepth === 12) {
//             moduleOptions['nmmes-module-encoder'].defaults.video.pixel_format = 'yuv420p12le';
//         }
//     }
//     if (flags.scale) moduleOptions['nmmes-module-encoder'].defaults.video.vf.push(`scale=${flags.scale}:-2`);
//     if (flags.preset) moduleOptions['nmmes-module-encoder'].defaults.video.preset = flags.preset;
//     if (flags.quality) moduleOptions['nmmes-module-encoder'].defaults.video.crf = flags.quality;
//     if (flags.preview) {
//         moduleOptions['nmmes-module-encoder'].defaults.video.t = flags.previewLength / 1000;
//     }
//     if (flags.nativeLangage) moduleOptions['nmmes-module-normalize'].language = flags.nativeLangage;
//     if (flags.forceHeAudio) moduleOptions['nmmes-module-he-audio'].force = flags.forceHeAudio;
//     if (flags.downmixHeAudio) moduleOptions['nmmes-module-he-audio'].downmix = flags.downmixHeAudio;
//     if (flags.previewLength) moduleOptions['nmmes-module-sample'].length = flags.previewLength;
//
//     return moduleOptions;
// }
//
// function applyAliases(flags) {
//     for (let flag of Object.keys(flags)) {
//         for (let aliasIndex in yargAliases[flag]) {
//             let alias = yargAliases[flag][aliasIndex];
//             flags[alias] = flags[flag];
//         }
//     }
//     return flags;
// }
//
// export default async function flags() {
//     const profile = await getProfile(args.profile);
//     let options = Object.assign(args, applyAliases(profile), applyAliases(explicitFlags()));
//     merge(options, {
//         moduleOptions: flagsToModuleOptions(options)
//     });
//     return options;
// }
//
// Logger.trace('Options parser loaded.');


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }










const npmip = __WEBPACK_IMPORTED_MODULE_7_bluebird___default.a.promisify(__WEBPACK_IMPORTED_MODULE_8_npmi___default.a);



const cliSpecificOptions = {
    'version': {
        describe: 'Displays version information.',
        group: 'General:',
        type: 'boolean',
        default: false
    },
    'help': {
        describe: 'Displays help page.',
        group: 'General:',
        type: 'boolean',
        default: false
    },
    'log-file': {
        default: '',
        describe: 'Sets the log file location for all output from h265ize.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'profile': {
        default: 'none',
        describe: 'Url or name of an encoding preset.',
        type: 'string',
        group: 'General:'
    },
    'g': {
        alias: 'temp-directory',
        default: __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__WEBPACK_IMPORTED_MODULE_1_os___default.a.tmpdir(), __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name),
        describe: 'Folder where files are stored during encoding.',
        type: 'string',
        normalize: true,
        group: 'General:'
    },
    'd': {
        alias: 'destination',
        default: __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(process.cwd(), 'nmmes-out'),
        describe: 'Folder where encoded files are output.',
        type: 'string',
        normalize: true,
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
    'debug': {
        default: false,
        describe: 'Enables debug mode. Prints extra debugging information.',
        type: 'boolean',
        group: 'Advanced:'
    },
    'modules': {
        describe: 'List of modules to enable',
        group: 'General:',
        type: 'array',
        default: ['encoder', 'he-audio', 'sample', 'normalize']
    }
};

function getVersion() {
    try {
        if (__WEBPACK_IMPORTED_MODULE_5_fs___default.a.existsSync('node_modules')) {
            let path = __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__WEBPACK_IMPORTED_MODULE_5_fs___default.a.realpathSync('node_modules'), '../');
            let version = __WEBPACK_IMPORTED_MODULE_4_git_rev_sync___default.a.branch(path) + '#' + __WEBPACK_IMPORTED_MODULE_4_git_rev_sync___default.a.short(path);
            return {
                version: __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.version,
                formatted: `(Development Build) ${version}`
            };
        }
    } catch (e) {
        return {
            version: __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.version,
            formatted: __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.version
        };
    }
}

/* harmony default export */ __webpack_exports__["a"] = ((() => {
    var _ref = _asyncToGenerator(function* () {
        let cliArgs = __WEBPACK_IMPORTED_MODULE_3_yargs___default.a.version(false).help(false).usage('Usage: $0 [options] file|directory').options(cliSpecificOptions).argv;

        let modules = yield loadModules(cliArgs.modules);
        let options = yield extractModuleOptions(modules);

        if (cliArgs.version) {
            console.log(`${__WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name} ${getVersion().formatted}`);
            process.exit();
        } else if (cliArgs.help || cliArgs._.length < 1 && !cliArgs.watch) {
            console.log('Package:', __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.name, '\t', 'Version:', getVersion().formatted);
            console.log('Description:', __WEBPACK_IMPORTED_MODULE_2__package_json___default.a.description);
            __WEBPACK_IMPORTED_MODULE_3_yargs___default.a.showHelp();
            process.exit();
        }

        // TODO: Profile doesn't work
        if (cliArgs.profile) Object.assign(cliArgs, (yield getProfile(cliArgs.profile)));

        Object.assign(options, cliSpecificOptions);

        let moduleArgs = __WEBPACK_IMPORTED_MODULE_3_yargs___default.a.version(false).help(false).usage('Usage: $0 [options] file|directory').options(options).argv;

        return {
            args: moduleArgs,
            modules
        };
    });

    function load() {
        return _ref.apply(this, arguments);
    }

    return load;
})());

const moduleDir = './external-modules';





function localProfiles() {
    let profiles = __webpack_require__(18).keys();
    for (let idx in profiles) {
        profiles[idx] = __WEBPACK_IMPORTED_MODULE_0_path___default.a.basename(profiles[idx], '.json');
    }
    return profiles;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./anime-10bit.json": 0,
	"./anime.json": 1
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
webpackContext.id = 8;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {"name":"nmmes-cli","version":"0.0.1","description":"A command line interface front end for nmmes-backend.","author":"Ayrton Sparling","license":"LGPL-3.0","engines":{"node":">=6.4.0"},"bin":{"nmmes":"nmmes-cli.js"},"scripts":{"check-dep":"npm-check -i source-map-loader -i source-map-support -i eslint || true ","test":"npm run build && npm run update-submodules && mocha-webpack --ui tdd test/cli.spec.js","dev":"webpack --env=development --watch","update-submodules":"git submodule foreach git pull origin master","dist":"webpack --define process.env.NODE_ENV=\"production\" --env=production --progress","build":"npm run dist && npm run pack","pack":"pkg -t latest-linux-x64,latest-win-x64 ./dist/package.json --out-path build","profile":"node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt","preversion":"npm test","version":"git add . && git commit -S","postversion":"git push","patch-release":"npm version patch && npm publish"},"main":"dist/nmmes-cli.js","repository":{"type":"git","url":"https://github.com/NMMES/nmmes-cli.git"},"dependencies":{"bluebird":"^3.5.1","chalk":"^2.1.0","fluent-ffmpeg":"^2.1.2","fs-extra":"^4.0.2","git-rev-sync":"^1.9.1","is-url":"^1.2.2","lodash":"^4.17.4","mime":"^2.0.3","moment":"^2.19.0","moment-duration-format":"^1.3.0","nmmes-module-autocrop":"^0.0.1","nmmes-module-encoder":"^0.0.1","nmmes-module-normalize":"^0.0.1","nmmes-module-sample":"^0.0.1","npmi":"^4.0.0","recursive-readdir":"^2.2.1","request":"^2.83.0","request-promise-native":"^1.0.5","requireg":"^0.1.7","source-map-support":"^0.5.0","yargs":"^9.0.1"},"devDependencies":{"babel-core":"^6.26.0","babel-eslint":"^8.0.1","babel-loader":"^7.1.2","babel-plugin-lodash":"^3.2.11","babel-plugin-module-resolver":"^2.7.1","babel-preset-es2016":"^6.24.1","babel-preset-stage-2":"^6.24.1","babel-register":"^6.26.0","babel-runtime":"^6.26.0","chai":"^4.1.2","eslint":"^4.8.0","mocha":"^4.0.1","mocha-webpack":"^0.7.0","npm-check":"^5.4.5","pkg":"^4.2.5","source-map-loader":"^0.2.2","webpack":"^3.6.0","webpack-node-externals":"^1.6.0"}}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("git-rev-sync");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("requireg");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("npmi");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("is-url");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./anime-10bit.json": 0,
	"./anime.json": 1
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
webpackContext.id = 18;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("mime");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("recursive-readdir");

/***/ })
/******/ ]);
});
//# sourceMappingURL=nmmes-cli.js.map