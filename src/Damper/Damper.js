import Vector from "../Vector/Vector";

export default class Damper {
    /**
     * @param {Vector} position
     * @param {number} mass
     */
    constructor(position = null, mass = null) {
        this._position = position || new Vector(0,0);
        this._mass     = mass || 5;
    }

    /**
     * @param {Particle} particle
     */
    getForce(particle) {
        const destination = Vector.getDestination(this._position, particle.getPosition());
        const force = this._mass / Math.pow(Math.pow(destination.getX(),2)+ Math.pow(destination.getY,2),1.5);

        return new Vector(destination.getX() * force, destination.getY() * force);
    }
}