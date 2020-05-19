import { Vector2D } from '@inwebo/vector';

export default class KinematicsSimple {
    /**
     * @param {Particle} particle
     */
    static move(particle) {
        particle.setPosition(Vector2D.add(particle.getPosition(), particle.getVelocity()));
    }

    /**
     * @param {Particle} particle
     */
    static moveAcceleration(particle) {
        particle.getVelocity().add(particle.getAcceleration());
        KinematicsSimple.move(particle);
    }

    /**
     * @param {Particle} particle
     * @param {Vector2D} force
     */
    static force(particle, force) {
       particle.getAcceleration().add(force);
    }
}