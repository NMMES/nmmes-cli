import blessed from 'blessed';
import Package from '../package.json';
import merge from 'lodash.merge';
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

let program = blessed.program();
program.hideCursor();

export default class Screen extends blessed.screen {
    title = Package.name;
    constructor() {
        super({
            program,
            fastCSR: true,
            dockBorders: true
        });
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
        this._statusBar = blessed.box(merge({}, defaults.box, {
            parent: this,
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            padding: {
                left: 0,
                right: 0
            },
            border: false,
        }));
        this._status = blessed.text(merge({}, defaults.text, {
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

        this._videoList = blessed.box(merge({}, defaults.box, {
            parent: this,
            label: 'Video List',
            left: 0,
            top: 0,
            bottom: this._statusBar.height,
            width: 50
        }));

        this._log = blessed.log(merge({}, defaults.box, {
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

        this._videoListStatus = blessed.text(merge({}, defaults.text, {
            parent: this._videoList,
            left: 0,
            right: 0,
            height: 1,
            bottom: 0,
            align: 'center',
            content: 'Successful: 0\t Failed: 0',
        }));
        this._list = blessed.box(merge({}, defaults.box, {
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
            bottom: this._videoListStatus.height,
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
                if (item.state === 'failed')
                    failed++;
                else if (item.state === 'successful')
                    successful++;
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
        stream.on('data', (buffer) => {
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
