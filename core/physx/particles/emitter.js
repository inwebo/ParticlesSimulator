//<![CDATA[
;(function(window){

    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Emitter = function(point, velocity, spread, maxParticles, emitRate){
        var plugin              = this;
        plugin.position = point;
        plugin.velocity = velocity;
        plugin.spread = spread || Math.PI / 32;
        plugin.maxParticles = maxParticles || 100;
        plugin.emittRate = emitRate || 5;

        plugin.move = function(point){
            plugin.position = point;
        };

        plugin.emitParticle = function(){
            var angle = plugin.velocity.getAngle() + plugin.spread - (Math.random() * plugin.spread * 2);
            var magnitude = plugin.velocity.getMagnitude();
            var position = new Particles.Vector(plugin.position.x, plugin.position.y);
            var t = new Particles.Vector();
            var velocity = t.fromAngle(angle, magnitude);
            return new Particles.Particle(position,velocity);
        };

    };
})(window);
//]]>