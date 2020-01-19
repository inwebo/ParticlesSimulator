import Vector from "../Vector/Vector";

export default class Particle {

    /**
     * @param {Vector|null} position
     * @param {Vector|null} velocity
     * @param {Vector|null} acceleration
     * @param {number|null} lifeTime
     */
    constructor(position = null, velocity = null, acceleration = null, lifeTime = null) {
        this._position      = position || new Vector(0,0);
        this._velocity      = velocity || new Vector(0,0);
        this._acceleration  = acceleration || new Vector(0,0);

        this._lifeTime      = lifeTime || -1;
        this._birth         = Date.now();
        this._death         = (this._lifeTime === -1) ? -1 : this._birth + this._lifeTime;
    }

    /**
     * @returns {Vector}
     */
    getPosition() {
        return this._position;
    }

    /**
     * @param {Vector} vector
     */
    setPosition(vector) {
        this._position = vector;
    }

    /**
     * @returns {boolean}
     */
    isPerpetual() {
        return this._lifeTime === -1;
    }

    /**
     * @param {number} timestamp
     * @returns {boolean}
     */
    isAlive(timestamp) {
        if(this.isPerpetual()) {
            return true;
        } else {
            return this._death > timestamp;
        }
    }

    stop() {
        this._velocity.setX(0);
        this._velocity.setY(0);

        this._acceleration.setX(0);
        this._acceleration.setY(0);
    }
}