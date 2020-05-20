import { Vector2D, Vector2DValidator } from "@inwebo/vector";

export default class Bounds {

    // region getters/setters
    /**
     * @return {Vector2D}
     */
    getMin() {
        return this._min;
    }

    /**
     * @return {number}
     */
    getXMin() {
        return this._min.getX();
    }

    /**
     * @return {number}
     */
    getYMin() {
        return this._min.getY();
    }

    /**
     * @return {Vector2D}
     */
    getMax() {
        return this._max;
    }

    /**
     * @return {number}
     */
    getXMax() {
        return this._max.getX();
    }

    /**
     * @return {number}
     */
    getYMax() {
        return this._max.getY();
    }
    // endregion getters/setters

    /**
     * @param {Vector2D} min
     * @param {Vector2D} max
     */
    constructor(min= null, max = null) {
        Vector2DValidator.validate(min);
        Vector2DValidator.validate(max);

        this._min = min;
        this._max = max;
    }

    /**
     * @param {number} number
     * @return {boolean}
     * @private
     */
    _inBoundsX(number) {
        const v = new Vector2D(number)

        return v.xge(this._min) && v.xle(this._max);
    }

    /**
     * @param {number} number
     * @return {boolean}
     * @private
     */
    _inBoundsXStrict(number) {
        const v = new Vector2D(number)

        return v.xgt(this._min) && v.xlt(this._max);
    }

    /**
     * @param {number} number
     * @param {boolean} strict
     * @return {boolean}
     */
    inBoundsX(number, strict = true) {
        return (strict) ? this._inBoundsXStrict(number) : this._inBoundsX(number);
    }

    /**
     * @param {number} number
     * @return {boolean}
     * @private
     */
    _inBoundsY(number) {
        const v = new Vector2D(0,number);

        return v.yge(this._max) && v.yle(this._max);
    }

    /**
     * @param {number} number
     * @return {boolean}
     * @private
     */
    _inBoundsYStrict(number) {
        const v = new Vector2D(0,number);

        return v.ygt(this._max) && v.ylt(this._max);
    }

    /**
     * @param {number} number
     * @param {boolean} strict
     * @return {boolean}
     */
    inBoundsY(number, strict = true) {
        return (strict) ? this._inBoundsYStrict(number) : this._inBoundsY(number);
    }

    /**
     * @param {Vector2D} vector
     * @return {boolean}
     * @private
     */
    _inBoundsStrict(vector) {
        Vector2DValidator.validate(vector);
        return this._inBoundsXStrict(vector.getX()) && this._inBoundsYStrict(vector.getY());
    }

    /**
     * @param {Vector2D} vector
     * @return {boolean}
     * @private
     */
    _inBounds(vector) {
        Vector2DValidator.validate(vector);
        return this._inBoundsX(vector.getX()) && this._inBoundsY(vector.getY());
    }

    /**
     * @param {Vector2D} vector
     * @param {boolean} strict
     * @returns {boolean}
     */
    inBounds(vector, strict = true) {
        Vector2DValidator.validate(vector);
        return (strict) ? this._inBoundsStrict(vector) : this._inBounds(vector);
    }
}