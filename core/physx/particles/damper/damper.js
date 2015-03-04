//<![CDATA[
;(function(window){
    window.LibreJs.Plugins.Physx.Particles.Damper = function(position, mass){
        var plugin          = this;
        plugin.position     = position || new Vector(0,0);
        plugin.mass         = mass || 5;

        plugin.getDistance = function(particle){
            //var x = plugin.position.x - particle.position.x;
            //var y = plugin.position.y - particle.position.y;
            //return new Vector(x,y);
            return new Vector(plugin.position.x - particle.position.x,plugin.position.y - particle.position.y);
        };

        plugin.getForce = function(particle){
            var distance = plugin.getDistance(particle);
            //var force = plugin.mass / Math.pow(distance.x* distance.x+ distance.y* distance.y,1.5);
            var force = plugin.mass / Math.pow(Math.pow(distance.x,2)+ Math.pow(distance.y,2),1.5);
            return new Vector(distance.x * force,distance.y * force);
        };
    };
    var Vector = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
})(window);
//]]>