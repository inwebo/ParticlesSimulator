export default class Ticker {
    /**
     * @param {number} interval
     */
    constructor(interval) {
        this._interval        = interval;
        this._now             = Date.now();
        this._ticks           = 0;
        this.setNextTick();
    }

    setNextTick() {
        this._nextTick = this._now + this._interval;
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
        if(this.isTicking(timestamp)) {
            this._ticks++;
            this.setNow(timestamp);
            this.setNextTick();
        }
    }

    /**
     * @param {number} timestamp
     * @return {boolean}
     */
    isTicking(timestamp) {
        return timestamp > this._nextTick;
    }
}