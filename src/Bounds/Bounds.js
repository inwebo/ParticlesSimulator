import Vector2D from "@inwebo/vector/src/Vector2D";

export default class Bounds {

    /**
     * @param {Vector2D|null} min
     * @param {Vector2D|null} max
     */
    constructor(min= null, max = null) {
        this._min = min || new Vector2D();
        this._max = max || new Vector2D();
    }

    /**
     * @param {number} number
     * @return {boolean}
     * @private
     */
    _inBoundsX(number) {
        return number <= this._max.getX() && number >= this._min.getX();
    }

    /**
     * @param {number} number
     * @return {boolean}
     * @private
     */
    _inBoundsXStrict(number) {
        return number < this._max.getX() && number > this._min.getX();
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
     * @param {boolean} strict
     * @return {boolean}
     */
    inBoundsY(number, strict = true) {
        return (strict) ? this._inBoundsYStrict(number) : this._inBoundsY(number);
    }

    _inBoundsStrict(vector) {
        return this._inBoundsXStrict(vector.getX()) && this._inBoundsYStrict(vector.getY());
    }

    /**
     * @param {Vector2D} vector
     * @return {boolean}
     * @private
     */
    _inBounds(vector) {
        return this._inBoundsX(vector.getX()) && this._inBoundsY(vector.getY());
    }

    /**
     * @param {Vector2D} vector
     * @param {boolean} strict
     * @returns {boolean}
     */
    inBounds(vector, strict = true) {
        return (strict) ? this._inBoundsStrict(vector) : this._inBounds(vector);
    }
}