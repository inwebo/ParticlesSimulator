import Vector from "../Vector/Vector";

export default class Particle {

    /**
     * @param {Vector|null} origin
     * @param {Vector|null} velocity
     * @param {Vector|null} acceleration
     * @param {number|null} lifeTime
     */
    constructor(origin = null, velocity = null, acceleration = null, lifeTime = null) {
        this._origin      = origin || new Vector(0,0);
        this._velocity      = velocity || new Vector(0,0);
        this._acceleration  = acceleration || new Vector(0,0);

        this._lifeTime      = lifeTime || -1;
        this._birth         = Date.now();
        this._death         = (this._lifeTime === -1) ? -1 : this._birth + this._lifeTime;
    }

    /**
     * @return {number} float [0, 1]
     */
    getPercentLife() {
        return (this.isPerpetual()) ? 1 : (this._death - Date.now()) / this._lifeTime * 100;
    }

    /**
     * @returns {Vector}
     */
    getOrigin() {
        return this._origin;
    }

    /**
     * @param {Vector} origin
     */
    setPosition(origin) {
        this._origin = origin;
    }

    /**
     * @param {number} vector
     */
    setAcceleration(vector) {
        this._acceleration = vector;
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
        this._velocity     = new Vector(0,0);
        this._acceleration = new Vector(0,0);
    }

    move() {
        this._velocity.add(this._acceleration);
        this._origin.add(this._velocity);
    }
}