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
            if( vector instanceof Vector) {
                plugin.x += vector.x;
                plugin.y += vector.y;
            }
        };

        /**
         * http://www.wolframalpha.com/input/?i=r+%3D+sqrt(x%5E2+%2B+y%5E2)
         * https://majewsky.wordpress.com/2011/04/10/optimization-tricks-fast-norm/
         * http://homepage.math.uiowa.edu/~jsimon/COURSES/M028Spring07/HANDOUTS/LevelCurves_Continued.pdf
         * http://www.azillionmonkeys.com/qed/sqroot.html
         * @returns {number}
         */
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

    /**
     * https://fr.m.wikipedia.org/wiki/Distance_entre_deux_points_sur_le_plan_cart%C3%A9sien
     * @param vector
     * @param vector
     * @returns {number}
     */
    window.LibreJs.Plugins.Physx.Particles.Vector.prototype.getDistance =  function(vector1, vector2){
        return Math.sqrt( Math.pow(vector2.x - vector1.x,2) + Math.pow(vector2.y - vector1.y,2) );
    };

    window.LibreJs.Plugins.Physx.Particles.Vector.prototype.getCoordinate = function(vectorFrom, vectorTo){
        return new Vector(
            vectorTo.x - vectorFrom.x,
            vectorTo.y - vectorFrom.y
        );
    };

})(window);
//]]>