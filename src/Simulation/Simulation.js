import { Vector2D } from '@inwebo/vector';
import Kinematics from "../Kinematics/Kinematics";

export default class Simulation {

    getSubjects() {
        return this._particles;
    }

    pushSubject(subject) {
        this._particles.push(subject);
    }

    constructor(bounds) {
        this._bounds    = bounds;
        this._particles = [];
    }

    /**
     * @param {Particle} particle
     * @return {boolean}
     */
    inBounds(particle) {
        return this._bounds.inBounds(particle.getPosition(), false);
    }

    garbageCollector() {
        let garbage = [];

        this._particles.forEach((particle) => {
            if(!particle.isAlive()) {
                garbage.push(particle);
            }
        });

        this._particles = this._particles.filter((particle) => {
            return !garbage.includes(particle);
        });
    }

    step() {
        this.garbageCollector();
        this._particles.forEach((particle) => {
            if(!this._bounds.inBoundsX(particle.getPosition().getX())) {

                if(particle.getPosition().getX() > this._bounds.getXMax()) {
                    particle.getPosition().set(this._bounds.getXMax(), particle.getPosition().getY());
                }
                if(particle.getPosition().getX() < this._bounds.getXMin()) {
                    particle.getPosition().set(this._bounds.getXMin(), particle.getPosition().getY());
                }

                particle.getVelocity().negativeX();
            }

            if(!this._bounds.inBoundsY(particle.getPosition().getY())) {

                if(particle.getPosition().getY() > this._bounds.getXMax()) {
                    particle.getPosition().set(particle.getPosition().getX(), this._bounds.getXMax());
                }
                if(particle.getPosition().getY() < this._bounds.getXMin()) {
                    particle.getPosition().set(particle.getPosition().getX(), this._bounds.getXMin());
                }

                particle.getVelocity().negativeY();
            }

            Kinematics.force(particle, new Vector2D(0, 2));
            Kinematics.forceWithMass(particle, new Vector2D(0, 2));

            Kinematics.move(particle);
        });
    }
}