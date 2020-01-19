export default class Vector {

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
     * @param {number} y
     */
    setY(y) {
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

    /**
     * @returns {number}
     */
    getMagnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    /**
     * @param {Vector} vector
     */
    add(vector) {
        this._x += vector.getX();
        this._y += vector.getY();
    }

    /**
     * @returns {number}
     */
    getAngle() {
        return Math.atan2(this._y, this._x);
    };

    /**
     * @param {number} angle
     * @param {number} magnitude
     * @returns {Vector}
     */
    static fromAngle(angle, magnitude) {
        return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }

    /**
     * @param {Vector} vector1
     * @param {Vector} vector2
     * @returns {number}
     */
    static getCartesianDistance(vector1, vector2) {
        return Math.sqrt( Math.pow(vector2.getX() - vector1.getX(),2) + Math.pow(vector2.getY() - vector1.getY(),2) );
    }

    /**
     * @param {Vector} vector2
     * @param {Vector} vector2
     * @returns {Vector}
     */
    static getEuclideanlDistance(vector1, vector2) {
        return new Vector(vector1.getX() - vector1.getX(), vector2.getY() - vector2.getY());
    }
}