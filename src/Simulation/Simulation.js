export default class Simulation {
    /**
     * @param {Bounds} bounds
     */
    constructor(bounds) {
        this._bounds       = bounds;
        this._emitters     = [];
        this._dampers      = [];
        this._maxParticles = 0;
        this._particles    = [];
        this._pps          = 60;
    }

    /**
     * @returns {Emitter[]}
     */
    getEmitters() {
        return this._emitters;
    }

    /**
     * @returns {Damper[]}
     */
    getDampers() {
        return this._dampers;
    }

    /**
     * @return {Particle[]}
     */
    getParticles() {
        return this._particles;
    }

    setMaxParticles() {
        this._maxParticles = 0;

        this._emitters.forEach((emitter) => {
            this._maxParticles += emitter.getMaxParticles();
        });

        // this._particles = new Array(this._maxParticles);
        // Object.freeze(this._particles);
    }

    /**
     * @param {Emitter} emitter
     */
    pushEmitter(emitter) {
        this._emitters.push(emitter);
        this.setMaxParticles();
    }

    /**
     * @param {Damper} damper
     */
    pushDamper(damper) {
        this._dampers.push(damper);
    }

    /**
     * @param {Particle} particle
     * @return {boolean}
     */
    inBounds(particle) {
        return this._bounds.inBounds(particle.getOrigin());
    }

    /**
     * @param {Particle} particle
     */
    pushParticle(particle) {
        this._particles.push(particle);
    }

    garbageCollector() {
        let garbage = [];

        this._particles.forEach((particle) => {
            if(this.inBounds(particle) === false) {
                garbage.push(particle);
            }
        });

        this._particles = this._particles.filter((particle) => {
            return !garbage.includes(particle);
        });
    }

    /**
     * @param {number} timestamp
     */
    step(timestamp) {
        this.garbageCollector();
        this.emit(timestamp);
        this.dampers();
        this.move();
        this.garbageCollector();
    }

    dampers() {
        this._dampers.forEach((damper) => {
            this._particles.forEach((particle) => {
                damper.getForce(particle);
                // particle.setAcceleration(damper.getForce(particle));
            });
        });
    }

    emit(timestamp) {
        this._emitters.forEach((emitter) => {
            if(emitter.getTicker().isTicking(timestamp)) {
                // if(emitter.getParticlesByFrame() > 1) {
                //     const particlePerFrame = emitter.getParticlesByFrame();
                //     for (let i=0; i < particlePerFrame; i++) {
                //         const particle = emitter.emit();
                //         this.pushParticle(particle);
                //     }
                //     emitter.getTicker().step(timestamp);
                // } else {
                    const particle = emitter.emit();
                    this.pushParticle(particle);
                    emitter.getTicker().step(timestamp);
                // }
            }
        });
    }

    move() {
        this._particles.forEach((particle) => {
            particle.move();
        });
    }
}