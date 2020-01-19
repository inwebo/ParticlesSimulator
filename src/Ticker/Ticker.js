export default class Ticker {
    /**
     * @param {number} interval
     */
    constructor(interval) {
        this._interval        = interval;
        this._now             = 0;
        this._ticks           = 0;
        this._timeIntervaLeft = 0;
    }

    reset() {
        this._interval = 0;
    }

    /**
     * @param {number} timestamp
     */
    setNow(timestamp) {
        this._now = timestamp;
    }

    /**
     * @param {number} timestamp
     */
    step(timestamp) {
        this._timeIntervaLeft += Math.floor(timestamp - this._now);
        if(this.isTicking()) {
            this._ticks++;
        }
    }

    isTicking() {
        return this._interval > this._timeIntervaLeft;
    }
}