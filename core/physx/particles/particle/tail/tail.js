//<![CDATA[
;(function(window){
    window.LibreJs.Plugins.Physx.Particles.Tail = function(size, captureInterval, distance) {
        var plugin              = this;
        // Length
        plugin.size             = size || 25;
        // ms
        plugin.captureInterval  = captureInterval || 33;
        // ms
        plugin.life             = plugin.size * plugin.captureInterval;
        plugin.particles        = [];

        plugin.getLength = function(){
            return plugin.particles.length;
        };

        plugin.gotFreeSpace = function () {
            return plugin.getLength() < plugin.size;
        };

        plugin.clean = function() {
            if(plugin.getLength() > (plugin.size-1)) {
                plugin.particles.shift();
            }
        };

        plugin.attach = function(x,y){
            plugin.clean();
            plugin.particles.push( new Vector(x, y) );
        };

        plugin.getLastElement = function(){
            if( !plugin.isEmpty() ) {
                return plugin.particles[plugin.getLength()-1];
            }
        };

        plugin.isEmpty = function(){
            return plugin.getLength() === 0;
        };

    };
    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
})(window);
//]]>