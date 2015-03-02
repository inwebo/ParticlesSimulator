//<![CDATA[
;(function(window){
    window.LibreJs.Plugins.Physx.Particles.Tail = function(size, captureInterval) {
        var plugin              = this;
        // Length
        plugin.size             = size || 5;
        // ms
        plugin.captureInterval  = captureInterval || 10;
        // ms
        plugin.life             = plugin.size * plugin.captureInterval;
        plugin.particles        = [];

        plugin.gotFreeSpace = function () {
            return plugin.particles.length < plugin.size;
        };

        plugin.clean = function() {
            if(plugin.particles.length > (plugin.size-1)) {
                plugin.particles.shift();
            }
        };

        plugin.attach = function(x,y){
            plugin.particles.push( new Vector(x, y) );
        };

        plugin.getLastElement = function(){
            if( plugin.particles.length !== 0 ) {
                return plugin.particles[plugin.particles.length-1];
            }
        };

        plugin.isEmpty = function(){
            return plugin.particles.length === 0;
        };

    };
    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
    var Particle    = window.LibreJs.Plugins.Physx.Particles.Particle.prototype.constructor;
})(window);
//]]>