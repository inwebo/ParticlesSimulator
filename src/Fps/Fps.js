export default class Fps {
    constructor() {
        this._lastCall = performance.now();
        this._interval = 10000;
    }

    _getDelta(now) {
        return  (now - this._lastCall) / 1000;
    }

    get() {
        const now   = performance.now();
        const delta = (now - this._lastCall) / 1000;
        this._lastCall = now;
        return Math.round(1/delta);
    }
}