//<![CDATA[
;(function(window){

    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Emitter = function(point, velocity, spread, maxParticles, pps, life, fps){
        var plugin = this;
        plugin.position = point;
        plugin.velocity = velocity;
        plugin.spread = spread || Math.PI / 32;
        plugin.maxParticles = maxParticles || 100;
        plugin.pps = pps || 5;
        plugin.particleLife = life || -1;
        plugin.fps = fps || 60;
        plugin.timestamp = 0;
        /**
         * Current tick interval MS
         * @type {number}
         */
        plugin.interval = 0;

        plugin.resetInterval = function(){
            plugin.interval = 0;
        };

        plugin.step = function(timestamp){
            plugin.interval += Math.floor(timestamp - plugin.timestamp);
        };

        plugin.setTimestamp = function(timestamp){
            plugin.timestamp = timestamp;
        };

        plugin.isTicking = function(){
            return (plugin.interval > plugin.getEmitInterval());
        };

        plugin.move = function(point){
            plugin.position = point;
        };

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

        plugin.emit = function(){
            var angle = plugin.velocity.getAngle() + plugin.spread - (Math.random() * plugin.spread * 2);
            var magnitude = plugin.velocity.getMagnitude();
            var position = new Particles.Vector(plugin.position.x, plugin.position.y);
            var t = new Particles.Vector();
            var velocity = t.fromAngle(angle, magnitude);
            var life = (plugin.particleLife !== -1) ? Math.floor((Math.random() * 100) + 1) * 10 * plugin.particleLife : -1;
            return new Particles.Particle(position,velocity,null,life);
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
         * Emit multiple particles ?
         * @returns {boolean}
         */
        plugin.isQueued = function() {
            return plugin.getParticlesByFrame() > 1;
        };

    };
})(window);
//]]>