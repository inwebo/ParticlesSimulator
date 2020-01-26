import Vector2D from '@inwebo/vector/src/Vector2D';
import Particle from "../Particle/Particle";
import KinematicsEnum from "../Kinematics/KinematicsEnum";

export default class Kinematics {
    /**
     * @param {Particle} particle
     */
    static uniform(particle) {
        particle.setPosition(Vector2D.add(particle.getPosition(), particle.getVelocity()));
    }

    static uniformAcceleration(particle) {
        // cherche acceleration
            // velocity
            const velocity = Math.sqrt(particle.getVelocity().getY() + 2 * 9.81);
            // console.log(KinematicsEnum.EARTH_GRAVITY);
            particle.getAcceleration().set(particle.getVelocity().getX(), velocity);
            Kinematics.uniform(particle);
    }
}