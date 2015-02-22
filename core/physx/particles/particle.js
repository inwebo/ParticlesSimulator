//<![CDATA[
;(function(window){
    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Particle = function(point, velocity, acceleration){
        var plugin          = this;
        plugin.point        = point || new Particles.Vector(0,0);
        plugin.velocity     = velocity || new Particles.Vector(0,0);
        plugin.acceleration = acceleration || new Particles.Vector(0,0);

        plugin.move = function(){
            plugin.velocity.add(plugin.acceleration);
            plugin.point.add(plugin.velocity);
        };

        plugin.setPoint =function(x,y){
            plugin.point.x = x;
            plugin.point.y = y;
        };

        plugin.draw = function(ctx){
            ctx.beginPath();
            ctx.arc(plugin.point.x, plugin.point.y, 2, 0, 2 * Math.PI, false);
            ctx.stroke();
        };

        plugin.damp = function(damper) {
            var acceleration = damper.getForce(plugin);
            plugin.acceleration = acceleration;
        };

    };

})(window);
//]]>