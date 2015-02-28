//<![CDATA[
;(function(window){
    /**
     * Simulation's base Object
     * @param x
     * @param y
     * @constructor
     */
    window.LibreJs.Plugins.Physx.Particles.Vector = function(x, y){
        var plugin  = this;
        plugin.x    = x || 0;
        plugin.y    = y || 0;

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

        plugin.reset = function(){
            plugin.x = 0;
            plugin.y = 0;
        };

    };

    var Vector = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
    /**
     * Static public
     * @param angle
     * @param magnitude
     * @returns {window.LibreJs.Plugins.Physx.Particles.Vector}
     */
    window.LibreJs.Plugins.Physx.Particles.Vector.prototype.fromAngle =  function(angle, magnitude){
        return new Vector( magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    };

})(window);
//]]>