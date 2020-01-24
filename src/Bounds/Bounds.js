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
     * @param {Vector2D} position
     * @returns {boolean}
     */
    inBounds(position) {
        return (
            (position.getX() < this._max.getX() && position.getX() > this._min.getX())
            &&
            (position.getY() < this._max.getY() && position.getY() > this._min.getY())
        );
    }
}