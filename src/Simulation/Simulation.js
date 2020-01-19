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

        this._emitters.forEach((e) => {
            this._maxParticles += e.getMaxParticles();
        }).bind(length);

        this._particles = new Array(this._maxParticles);
        Object.freeze(this._particles);
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
     * @param vector
     * @return {boolean}
     */
    inBounds(vector) {
        return this._bounds.isInBounds(vector);
    }

    /**
     * @param {Particle} particle
     */
    pushParticle(particle) {
        this._particles.push(particle);
    }

    garbageCollector() {

    }

    /**
     * @param {number} timestamp
     */
    step(timestamp) {
        this.garbageCollector();
        this._emitters.forEach((emitter) => {
            emitter.getTicker().step(timestamp);

            if(emitter.isTicking()) {
                if(emitter.getParticlesByFrame() > 1) {
                    const particlePerFrame = emitter.getParticlesByFrame();
                    for (let i=0; i < particlePerFrame; i++) {
                        this.emit();
                    }
                } else {
                    this.emit();
                }

                emitter.reset();
                emitter.getTicker().setNow(timestamp);
            }
        });
    }

    emit() {
        this._emitters.forEach((emitter) => {
            if(this._particles.length < this._maxParticles) {
                this.pushParticle(emitter.emit());
            }
        });
    }
}