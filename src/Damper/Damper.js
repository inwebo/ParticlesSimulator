import Vector from "../Vector/Vector";

export default class Damper {
    /**
     * @param {Vector} origin
     * @param {number} mass
     */
    constructor(origin = null, mass = null) {
        this._origin = origin || new Vector(0,0);
        this._mass     = mass || 5;
    }

    /**
     * @param {Particle} particle
     */
    getForce(particle) {
        const destination = Vector.getEuclideanlDistance(
            new Vector(this._origin.getX(), this._origin.getY()),
            new Vector(particle.getOrigin().getX(), particle.getOrigin().getY())
        );

        const force = this._mass / Math.pow(Math.pow(destination.getX(),2)+ Math.pow(destination.getY,2),1.5);


        return new Vector(destination.getX() * force, destination.getY() * force);
    }
}