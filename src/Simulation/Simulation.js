export default class Simulation {
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
                particle.getVelocity().negativeX();
            }

            if(!this._bounds.inBoundsY(particle.getPosition().getY())) {
                particle.getVelocity().negativeY();
            }

            particle.move();
        });
    }
}