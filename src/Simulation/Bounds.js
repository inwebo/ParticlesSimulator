export default class Bounds {

    /**
     * @param {Vector} min min, y min
     * @param {Vector} max max, y max
     */
    constructor(min, max) {
        this._min = min;
        this._max = max;
    }

    /**
     * @param {Vector} position
     * @returns {boolean}
     */
    isInBounds(position) {
        return (
            (position.getX() < this._max.getX() && position.getX() > this._min.getX())
            &&
            (position.getY() < this._max.getY() && position.getY() > this._min.getY())
        );
    }
}