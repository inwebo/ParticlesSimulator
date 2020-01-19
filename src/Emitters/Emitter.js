import Ticker from "../Ticker/Ticker";
import Vector from "../Vector/Vector";
import Particle from "../Particle/Particle";

export default class Emitter {
    /**
     *
     * @param {Vector} origin
     * @param {Vector} initialVelocity
     * @param {number} spreadAngle
     * @param {number} maxParticles
     * @param {number} spreadOrientation
     * @param {number} particleLifeTime
     * @param {number} pps Particle per second
     * @param {number} fps
     */
    constructor(origin, initialVelocity, maxParticles, spreadOrientation, particleLifeTime = -1, spreadAngle= 0, pps = 1 , fps = 60) {
        this._origin          = origin;
        this._initialVelocity   = initialVelocity;
        this._spreadAngle       = spreadAngle;
        this._spreadOrientation = spreadOrientation || Math.PI / 32;
        this._maxParticles      = maxParticles;
        this._pps               = pps;
        this._particleLifeTime  = particleLifeTime;
        this._fps               = fps;
        this._ticker            = new Ticker(this.getEmitInterval());
    }

    /**
     * @return {number}
     */
    getMaxParticles() {
        return this._maxParticles;
    }

    /**
     * @returns {number}
     */
    getEmitInterval() {
        return 1000 / this._pps;
    }

    /**
     * @returns {number}
     */
    getFrameDuration() {
        return ((1 / this._fps) * 1000);
    }

    /**
     * @return {Ticker}
     */
    getTicker() {
        return this._ticker;
    }

    /**
     * @returns {number}
     */
    getParticlesByFrame() {
        return Math.floor(this.getFrameDuration() / this.getEmitInterval());
    }

    /**
     * @param {Vector} origin
     */
    setOrigin(origin) {
        this._origin = origin;
    }

    emit() {
        const spreadOrientation = Math.degreesToRadians(this._spreadOrientation);
        const angle             = this._initialVelocity.getAngle() + spreadOrientation + ( this._spreadAngle - (Math.random() * this._spreadAngle * 4) );
        const magnitude         = this._initialVelocity.getMagnitude();
        const velocity          = Vector.fromAngle(angle, magnitude);

        return new Particle(new Vector(this._origin.getX(), this._origin.getY()), velocity, null, this._particleLifeTime);
    }
}