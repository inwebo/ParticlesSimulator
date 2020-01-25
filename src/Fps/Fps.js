export default class Fps {
    constructor() {
        this.lastCall = performance.now();
    }

    get() {
        const delta = (performance.now() - this.lastCall) / 1000;
        this.lastCall = performance.now();

        return Math.round(1/delta);
    }
}