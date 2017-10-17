"use strict";
import Package from '../package.json';
import blessed from 'blessed';
import {
    throttle,
    merge
} from 'lodash';
// import pusage from 'pidusage';

const THROTTLE = 100;
class Screen extends blessed.screen {
    title = Package.name;
    constructor() {
        let program = blessed.program();
        program.hideCursor();
        super({
            program,
            fastCSR: true,
            dockBorders: true
        });
        // this.render = throttle(this.render, THROTTLE);


        process.on('SIGINT', this._destroy.bind(this));
        process.on('SIGUSR2', this._destroy.bind(this));
        process.on('uncaughtException', this._destroy.bind(this));

        this.initializeWindows();
    }

    _destroy() {
        this.program.showCursor();
        this.destroy();
    }
}

//
//
// import blessed from 'blessed';
// import Package from '../package.json';
// import {throttle, merge} from 'lodash';
// // import pusage from 'pidusage';
//
// const THROTTLE = 100;
//
// const defaults = {
//     text: {
//         padding: {
//             left: 1,
//             right: 1
//         }
//     },
//     box: {
//         border: {
//             type: 'line'
//         },
//         style: {
//             border: {
//                 fg: '#f0f0f0'
//             }
//         },
//         padding: {
//             left: 1,
//             right: 1
//         }
//     }
// };
//
// export default class Screen extends blessed.screen {
//     title = Package.name;
//     constructor() {
//         let program = blessed.program();
//         program.hideCursor()
//         super({
//             program,
//             fastCSR: true,
//             dockBorders: true
//         });
//         this.render = throttle(this.render, THROTTLE);
//         this.init();
//     }
//     // updateSysInfo() {
//     //     let _self = this;
//     //     pusage.stat(process.pid, function(err, stat) {
//     //         if (err) {
//     //             _self._sysInfo.setContent(err.message);
//     //             return _self.render();
//     //         }
//     //         _self._sysInfo.setContent(`CPU: ${stat.cpu.toFixed(0)}\tMEM: ${stat.memory}`);
//     //         _self.render();
//     //     })
//     // }
//     init() {
//         // this.sysInfoInterval = setInterval(this.updateSysInfo.bind(this), 1000);
//         this._statusBar = blessed.box(merge({}, defaults.box, {
//             parent: this,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: 1,
//             padding: {
//                 left: 0,
//                 right: 0
//             },
//             border: false,
//         }));
//         this._status = blessed.text(merge({}, defaults.text, {
//             parent: this._statusBar,
//             style: {
//                 bg: 'blue'
//             },
//             content: 'Ready'
//         }));
//         // this._sysInfo = blessed.text(merge({}, defaults.text, {
//         //     parent: this._statusBar,
//         //     content: ''
//         // }));
//
//         this._videoList = blessed.box(merge({}, defaults.box, {
//             parent: this,
//             label: 'Video List',
//             left: 0,
//             top: 0,
//             bottom: this._statusBar.height,
//             width: 100
//         }));
//
//         this._log = blessed.log(merge({}, defaults.box, {
//             parent: this,
//             scrollback: 2000,
//             scrollbar: {
//                 ch: ' ',
//                 inverse: true
//             },
//             mouse: true,
//             label: 'Log',
//             right: 0,
//             top: 0,
//             bottom: this._statusBar.height,
//             width: this.width - this._videoList.width + 1
//         }));
//         this._log.on('scroll', this.render.bind(this));
//
//         this._videoListStatus = blessed.layout(merge({}, defaults.box, {
//             parent: this._videoList,
//             left: 0,
//             right: 0,
//             height: 1,
//             bottom: 0,
//             border: false
//         }));
//         this._videoListStatusSuccessful = blessed.text(merge({}, defaults.text, {
//             parent: this._videoListStatus,
//             height: 1,
//             content: 'Successful: 0',
//         }));
//         this._videoListStatusFailed = blessed.text(merge({}, defaults.text, {
//             parent: this._videoListStatus,
//             height: 1,
//             content: 'Failed: 0',
//         }));
//         this._list = blessed.box(merge({}, defaults.box, {
//             parent: this._videoList,
//             scrollable: true,
//             scrollbar: {
//                 ch: ' ',
//                 inverse: true
//             },
//             mouse: true,
//             left: 0,
//             top: 0,
//             right: 0,
//             border: false,
//             bottom: this._videoListStatus.height,
//         }));
//         this._list.on('scroll', this.render.bind(this));
//         this.render();
//     }
//     set videoList(list) {
//         let _self = this;
//         list.onUpdate = () => {
//             let failed = 0,
//                 successful = 0;
//             for (let item of list.items) {
//                 if (item.state === 'successful')
//                     _self._videoListStatusSuccessful.setContent(`Successful: ${++successful}`);
//                 else if (item.state === 'failed')
//                     _self._videoListStatusFailed.setContent(`Failed: ${++failed}`);
//             }
//             _self._list.setContent(list.output);
//             _self.render();
//         };
//         this._list.setContent(list.output);
//         this.render();
//     }
//     set logStream(stream) {
//         let _self = this;
//         stream.on('data', (buffer) => {
//             let string = buffer.toString('utf8').trim();
//             _self._log.pushLine(string);
//             _self.render();
//         });
//     }
//     set status(status) {
//         this._status.style.bg = status.color || 'blue';
//         this._status.setContent(status.content);
//         this.render();
//     }
// }
