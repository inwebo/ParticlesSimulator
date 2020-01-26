import Vector2D from '@inwebo/vector/src/Vector2D';
import Particle from "../Particle/Particle";
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};
const negative = () => {
    return Math.round(Math.random()) * 2 - 1;
};
export default class Kinematics {
    /**
     * @param {Particle} particle
     */
    static uniform(particle) {
        particle.setPosition(Vector2D.add(particle.getPosition(), particle.getVelocity()));
    }

    /**
     * @param {Particle} particle
     */
    static uniformAcceleration(particle) {
        // const velocity = Math.sqrt(particle.getVelocity().getY() + 2 * 9.81);
        // particle.getAcceleration().set(particle.getVelocity().getX(), velocity);
        // particle.getVelocity().set(particle.getVelocity().getX(), particle.getVelocity().getY() + particle.getAcceleration().getY());

        Kinematics.uniform(particle);
    }

    /**
     * @param {Particle} particle
     */
    static simpleGravity(particle) {
        let acceleration = particle.getVelocity().getY();
        acceleration *= particle.getAcceleration().getX();
        acceleration += particle.getAcceleration().getY();

        particle.getVelocity().set(particle.getVelocity().getX(), acceleration);

        Kinematics.uniform(particle);
    }

    /**
     * @param {Particle} particle
     */
    static random(particle) {
        particle.getVelocity().set(getRandomInt(10) * negative(), getRandomInt(10) * negative());
        this.uniform(particle);
    }
}