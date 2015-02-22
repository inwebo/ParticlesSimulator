//<![CDATA[
;(function(window){

    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Vector = function(x, y){
        var plugin              = this;
        plugin.x = x || 0;
        plugin.y = y || 0;

        plugin.add = function(vector){
            //if( vector instanceof Particles.Vector) {
                plugin.x += vector.x;
                plugin.y += vector.y;
            //}
        };

        plugin.getMagnitude = function(){
            return Math.sqrt(plugin.x*plugin.x+plugin.y*plugin.y);
        };

        plugin.getAngle = function(){
            return Math.atan2(plugin.y, plugin.x);
        };

        plugin.fromAngle = function(angle, magnitude){
            return new Particles.Vector(magnitude*Math.cos(angle), magnitude * Math.sin(angle));
        };

    };
})(window);
//]]>