import { Vector2D } from '@inwebo/vector';

export default class Attractor {
    /**
     * @param {number} mass
     * @param {Vector2D} position
     */
    constructor(mass, position) {
        this._G        = 10;
        this._mass     = mass;
        this._position = position;
    }

    /**
     * @param {Vector2D} vector
     */
    attract(vector) {
        const force = Vector2D.substract(this._position, vector);
        const distance = force.magnitude();
        const strength = (this._G * this._mass * v._mass) / (distance * distance);
        force.multiply(strength);
    }
}