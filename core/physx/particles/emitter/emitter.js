//<![CDATA[
;(function(window){

    /**
     * <p>
     * Will emit (instanciate) particles from point <code>point</code>, at a rate of <code>pps</code> until <code>maxParticles</code>
     * is reach at a display rate of <code>fps</code>. Emitter will emit in an angle of <code>spread</spread>. Emitted
     * particles will live for <code>life</code> seconds and will be progressively faded if life !== -1. Particle members
     * are randomized.
     * </p>
     *
     * @param {window.LibreJs.Plugins.Physx.Particles.Vector} point
     * @param {window.LibreJs.Plugins.Physx.Particles.Vector} velocity
     * @param {float} spread Angle, default  Math.PI / 32
     * @param {int} maxParticles Max emitter particles, default 100
     * @param {int} pps How many Particles Per Seconds, default 5
     * @param {int} life -1 eternal or life in seconds will progressively fade out particle, default -1
     * @param {int} fps Frames Per Seconds of animation, default 60
     * @param {int} spreadOrientation degrees
     * @constructor
     */
    window.LibreJs.Plugins.Physx.Particles.Emitter = function(point, velocity, spread, maxParticles, pps, life, fps, tailConfig, spreadOrientation){
        var plugin = this;
        plugin.position         = point;
        plugin.velocity         = velocity;
        plugin.spread           = spread || Math.PI / 32;
        plugin.maxParticles     = maxParticles || 100;
        plugin.pps              = pps || 5;
        plugin.particleLife     = life || -1;
        plugin.fps              = fps || 60;
        plugin.ticker           = null;
        plugin.tailConfig       = tailConfig || null;
        plugin.spreadOrientation= spreadOrientation || null;

        var init = function(){
            plugin.ticker = new Ticker(plugin.getEmitInterval());
        };

        //region Getters / Helpers
        /**
         * @returns {number} Ms
         */
        plugin.getEmitInterval = function(){
            return (1000 / plugin.pps) ;
        };

        /**
         * @returns {number} Ms
         */
        plugin.getFrameDuration = function(){
            return (1/plugin.fps) * 1000;
        };

        /**
         * @returns {number} Int
         */
        plugin.getParticlesByFrame = function(){
            return Math.floor(plugin.getFrameDuration() / plugin.getEmitInterval());
        };

        /**
         * Return number of particles to emit for input ms
         * @param ms
         * @returns {number}
         */
        /*@todo
        plugin.getParticlesByDuration = function(ms){
            var ms = (ms / 1000);
            if( ms === 1 ) {
                return ms;
            }
            var frames = Math.ceil(ms / plugin.getFrameDuration());
            return frames * plugin.getParticlesByFrame();
        };
        */
        /**
         * Emit multiple particles for each tick ?
         * @returns {boolean}
         */
        plugin.emitMultipleParticlesByTick = function() {
            return plugin.getParticlesByFrame() > 1;
        };

        plugin.move = function(position){
            plugin.position = position;
        };
        //endregion

        /**
         * New random particle
         * @returns {window.LibreJs.Plugins.Physx.Particles.Particle}
         */
        plugin.emit = function(){
            // @todo !rabdomize && angle
            var spreadOrientation = (plugin.spreadOrientation != null) ? Math.degreesToRadians(plugin.spreadOrientation) : 0;
            var angle = plugin.velocity.getAngle() + spreadOrientation + ( plugin.spread - (Math.random() * plugin.spread * 4) );
            var magnitude = plugin.velocity.getMagnitude();
            var position = new Vector(plugin.position.x, plugin.position.y);
            var velocity = fromAngle(angle, magnitude);
            var life = (plugin.particleLife !== -1) ? Math.floor((Math.random() * 100) + 1) * 10 * plugin.particleLife : -1;
            var particle = new Particle(position,velocity,null,life);
            if( plugin.tailConfig !== null ) {
                var tailConfig = new TailConfig(
                    plugin.tailConfig.size,
                    plugin.tailConfig.captureInterval
                );
                particle.attachTailConfig(tailConfig);
            }
            return particle;
        };

        init();

    };
    var Particle    = window.LibreJs.Plugins.Physx.Particles.Particle.prototype.constructor;
    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
    var fromAngle   = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.fromAngle;
    var Ticker      = window.LibreJs.Plugins.Ticker.prototype.constructor;
    var TailConfig  = window.LibreJs.Plugins.Physx.Particles.Tail.prototype.constructor;
})(window);
//]]>