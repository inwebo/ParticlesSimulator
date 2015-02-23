//<![CDATA[
;(function(window){

    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Emitter = function(point, velocity, spread, maxParticles, rate, life){
        var plugin = this;
        plugin.position = point;
        plugin.velocity = velocity;
        plugin.spread = spread || Math.PI / 32;
        plugin.maxParticles = maxParticles || 100;
        plugin.rate = rate || 5;
        plugin.particleLife = life || -1;

        plugin.move = function(point){
            plugin.position = point;
        };

        plugin.emitParticle = function(){
            var angle = plugin.velocity.getAngle() + plugin.spread - (Math.random() * plugin.spread * 2);
            var magnitude = plugin.velocity.getMagnitude();
            var position = new Particles.Vector(plugin.position.x, plugin.position.y);
            var t = new Particles.Vector();
            var velocity = t.fromAngle(angle, magnitude);

            var life = (plugin.particleLife !== -1) ? Math.floor((Math.random() * 100) + 1) * 10 * plugin.particleLife : -1;

            return new Particles.Particle(position,velocity,null,life);
        };

    };
})(window);
//]]>