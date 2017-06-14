import cliSpinners from 'cli-spinners';
import figures from 'figures';
import throttle from 'lodash.throttle';
import chalk from 'chalk';
import {noop} from 'node-noop';

const THROTTLE = 80;

export class Item {
    _state = 'pending'
    _error = ''
    _open = false
    output = ''
    onUpdate = noop
    constructor(options) {
        Object.assign(this, options);
        if (this.content)
            this.content.onUpdate = this.render;
        this.render();
    }
    set state(state) {
        this._state = state;
        if (state === 'active') {
            this.interval = setInterval(this.render.bind(this), 80);
        } else {
            if (this.interval)
                clearInterval(this.interval);
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
        this._error = chalk.red('- ' + err.trim());
        this.render();
    }
    render = throttle(() => {
        this.output = `${this.icon} ${this.title} ${this._error}`;
        if (this.content && (this._state === 'active' || this._state === 'failed' || this._open === true)) {
            this.output += '\n   ' + this.content.output.replace(/\n/g, '\n   ');
        }
        this.onUpdate();
    }, THROTTLE)
    iconFrame = 0;
    get icon() {
        let icon = '';
        if (this.iconFrame >= cliSpinners.dots.frames.length)
            this.iconFrame = 0;
        switch (this._state) {
            case 'active':
                icon = chalk.blue(cliSpinners.dots.frames[this.iconFrame++]);
                break;
            case 'completed':
                icon = figures.tick;
                break;
            case 'failed':
                icon = figures.cross;
                break;
            default:
                icon = '-';
                break;
        }
        return `${icon} `;
    }
}

export class List {
    output = ''
    onUpdate = noop
    constructor(items) {
        let _self = this;
        for (let item of items) {
            item.onUpdate = () => {
                _self.render();
            };
        }
        this.items = items;
        this.render();
    }
    render = throttle(() => {
        this.output = this.items.reduce((arr, item) => {
            arr.push(item.output);
            return arr;
        }, []).join('\n');
        this.onUpdate();
    }, THROTTLE);
}
