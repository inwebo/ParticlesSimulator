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
     * Are bounds in this
     *
     * @param {Bounds} bounds
     * @param {boolean} strict
     */
    within(bounds, strict = true) {
        if(strict) {

        }

        if(!strict) {

        }
    }

    /**
     * Are bounds outside this
     * @param {Bounds} bounds
     * @param {boolean} _strict
     */
    without(bounds, _strict = true) {
        return !this.within(bounds, _strict);
    }

    /**
     * @param {Vector2D} vector
     * @return {boolean}
     * @private
     */
    _inBoundsX(vector) {
        return number <= this._max.getX() && number >= this._min.getX();
    }

    /**
     * @param {Vector2D} vector
     * @return {boolean}
     * @private
     */
    _inBoundsXStrict(vector) {
        return number < this._max.getX() && number > this._min.getX();
    }

    /**
     * @param {number} number
     * @param {boolean} _strict
     * @return {boolean}
     */
    inBoundsX(number, _strict = true) {
        const vector = new Vector2D(number, 0);

        return (_strict) ? this._inBoundsXStrict(number) : this._inBoundsX(number);
    }


    /**
     * @param {number} number
     * @return {boolean}
     * @private
     */
    _inBoundsY(number) {
        return number <= this._max.getY() && number >= this._min.getY();
    }

    /**
     * @param {number} number
     * @return {boolean}
     * @private
     */
    _inBoundsYStrict(number) {
        return number < this._max.getY() && number > this._min.getY();
    }

    /**
     * @param {number} number
     * @param {boolean} _strict
     * @return {boolean}
     */
    inBoundsY(number, _strict = true) {
        const vector = new Vector2D(0, number);

        return (_strict) ? this._inBoundsYStrict(number) : this._inBoundsY(number);
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
     * @param {boolean} _strict
     * @returns {boolean}
     */
    inBounds(vector, _strict = true) {
        Vector2DValidator.validate(vector);
        return (_strict) ? this._inBoundsStrict(vector) : this._inBounds(vector);
    }
}