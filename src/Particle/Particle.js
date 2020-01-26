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
    setPosition(vector)  {
        return this._position = vector;
    }

    /**
     * @return {Vector2D}
     */
    getVelocity()  {
        return this._velocity;
    }

    /**
     * @return {Vector2D}
     */
    getAcceleration() {
        return this._acceleration;
    }

    /**
     * @param {Vector2D|null} position
     * @param {Vector2D|null} velocity
     * @param {Vector2D|null} acceleration
     * @param {number} life milliseconds
     */
    constructor(position = null, velocity = null, acceleration = null, life= -1) {
        this._position     = position     || new Vector2D();
        this._velocity     = velocity     || new Vector2D();
        this._acceleration = acceleration || new Vector2D();
        this._life         = life;
        this._birth        = (!this.isEternal()) ? performance.now() : null;
        this._death        = (!this.isEternal()) ? this._birth + life : null;
    }

    /**
     * @return {boolean}
     */
    isEternal() {
        return this._life === -1;
    }

    /**
     * @return {boolean}
     */
    isAlive() {
        if(this.isEternal()) {
            return true;
        } else {
            return performance.now() < this._death;
        }
    }

    stop() {
        this._velocity     = this._velocity.zero();
        this._acceleration = this._acceleration.zero();
    }
}