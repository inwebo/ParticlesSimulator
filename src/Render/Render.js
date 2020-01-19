export default class Render {
    /**
     * @param {HTMLElement} canvas
     * @param {Simulation} simulation
     */
    constructor(canvas, simulation) {
        this._canvas     = canvas;
        this._ctx        = canvas.getContext('2d');
        this._simulation = simulation;
        this._particleRenderer = null;
        this.setDefaultParticleRenderer();
        this.setOrigin();
    }

    getContext() {
        return this._ctx;
    }

    setOrigin() {
        this._ctx.translate( 0, this._canvas.height );
        this._ctx.scale( 1, -1 );
    }

    clear() {
        this._ctx.save();
        this._ctx.fillStyle = "whitesmoke";
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }

    /**
     * @param {CallableFunction} callback
     */
    setParticleRenderer(callback) {
        this._particleRenderer = callback;
    }

    setDefaultParticleRenderer() {
        /**
         * @param {Particle} particle
         * @private
         */
        this._particleRenderer = (particle) => {
            this.getContext().save();
            this.getContext().beginPath();
            this.getContext().arc(particle.getOrigin().getX(), particle.getOrigin().getY(), 10, 0, 2 * Math.PI, false);
            const percent = particle.getPercentLife();
            this.getContext().fillStyle = `rgba(0,0,0,${percent}`;
            this.getContext().fill();
            this.getContext().restore();
        };
    }

    draw() {
        this.clear();
        this.drawParticles();
    }

    drawParticles() {
        this._simulation.getParticles().forEach((particle) => {
            this._particleRenderer(particle);
        });
    }
}