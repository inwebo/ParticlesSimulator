//<![CDATA[
;(function(window){
    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Damper = function(point, mass){
        var plugin          = this;
        plugin.point        = point || new Particles.Vector(0,0);
        plugin.mass         = mass || 5;

        plugin.draw = function(ctx){
            ctx.beginPath();
            ctx.arc(plugin.point.x, plugin.point.y, 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = "red";
            ctx.fill();

        };

        plugin.getDistance = function(particle){
            var x = plugin.point.x - particle.point.x;
            var y = plugin.point.y - particle.point.y;
            return new Particles.Vector(x,y);
        };

        plugin.getForce = function(particle){
            var distance = plugin.getDistance(particle);
            var force = plugin.mass / Math.pow(distance.x* distance.x+ distance.y* distance.y,1.5);
            return new Particles.Vector(distance.x * force,distance.y * force);
        };
    };

})(window);
//]]>