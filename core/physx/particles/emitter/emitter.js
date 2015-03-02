//<![CDATA[
;(function(window){

    /**
     * <p>
     * Will emit (instanciate) particles from point <code>point</code>, at a rate of <code>pps</code> until <code>maxParticles</code>
     * is reach at a display rate of <code>fps</code>. Emitter will emit in an angle of <code>spread</spread>. Emitted
     * particles will live for <code>life</code> seconds and will be progressively faded if life !== -1. Particle memebers
     * are randomized.
     * </p>
     *
     * @param {window.LibreJs.Plugins.Physx.Particles.Vector} point
     * @param {window.LibreJs.Plugins.Physx.Particles.Vector} velocity
     * @param float spread Angle, default  Math.PI / 32
     * @param int maxParticles Max emitter particles, default 100
     * @param int pps How many Particles Per Seconds, default 5
     * @param int life -1 eternal or life in seconds will progressively fade out particle, default -1
     * @param int fps Frames Per Seconds of animation, default 60
     * @constructor
     */
    window.LibreJs.Plugins.Physx.Particles.Emitter = function(point, velocity, spread, maxParticles, pps, life, fps){
        var plugin = this;
        plugin.position     = point;
        plugin.velocity     = velocity;
        plugin.spread       = spread || Math.PI / 32;
        plugin.maxParticles = maxParticles || 100;
        plugin.pps          = pps || 5;
        plugin.particleLife = life || -1;
        plugin.fps          = fps || 60;
        plugin.ticker       = null;

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
        plugin.getParticlesByDuration = function(ms){
            var ms = (ms / 1000);
            var frames = Math.floor(ms / plugin.getFrameDuration());
            return frames * plugin.getParticlesByFrame();
        };

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
            var angle = plugin.velocity.getAngle() + plugin.spread - (Math.random() * plugin.spread * 2);
            var magnitude = plugin.velocity.getMagnitude();
            var position = new Vector(plugin.position.x, plugin.position.y);
            var velocity = fromAngle(angle, magnitude);
            var life = (plugin.particleLife !== -1) ? Math.floor((Math.random() * 100) + 1) * 10 * plugin.particleLife : -1;
            var particle = new Particle(position,velocity,null,life);
            var tailConfig = new TailConfig(
                25,
                33
            );
            particle.attachTailConfig(tailConfig);
            return particle;
        };

        init();

    };
    var Particle    = window.LibreJs.Plugins.Physx.Particles.Particle.prototype.constructor;
    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
    var fromAngle   = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.fromAngle;
    var Ticker = window.LibreJs.Plugins.Ticker.prototype.constructor;
    var TailConfig  = window.LibreJs.Plugins.Physx.Particles.Tail.prototype.constructor;
})(window);
//]]>