export default class Vector {

    _x;
    _y;

    /**
     * @returns {number}
     */
    getX() {
        return this._x;
    }

    /**
     * @param {number} x
     */
    setX(x) {
        this._x = x;
    }

    /**
     * @returns {number}
     */
    getY() {
        return this._y;
    }

    /**
     * @param {number} v
     */
    setY(v) {
        this._y = y;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
}