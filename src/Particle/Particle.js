import Vector2D from "@inwebo/vector/src/Vector2D";

export default class Particle {

    /**
     * @return {Vector2D}
     */
    getPosition()  {
        return this._position;
    }

    /**
     * @return {Vector2D}
     */
    getVelocity()  {
        return this._velocity;
    }

    /**
     * @param {Vector2D|null} position
     * @param {Vector2D|null} velocity
     * @param {Vector2D|null} acceleration
     */
    constructor(position = null, velocity = null, acceleration = null) {
        this._position     = position     || new Vector2D();
        this._velocity     = velocity     || new Vector2D();
        this._acceleration = acceleration || new Vector2D();
    }

    stop() {
        this._velocity     = this._velocity.zero();
        this._acceleration = this._acceleration.zero();
    }

    move() {
        this._velocity.add(this._acceleration);
        this._position.add(this._velocity);
    }
}