//<![CDATA[
;(function(window){
    window.LibreJs.Plugins.Physx.Particles.Navigator = function(particle) {
        var plugin              = this;

        plugin.speed = 100;

        plugin.to = function(x, y, speed){

        };

        plugin.byPath = function(path){};

        init(particle);
    };
    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;

    /**
     *
     * @param pathNode
     */
    window.LibreJs.Plugins.Physx.Particles.Navigator.prototype.extractPath = function(pathNode) {
        var coords = pathNode.getAttribute('d');
        var buffer = [];

        coords = coords.split(' ');
        coords.shift();

        for(var i=0; i<coords.length;i++) {
            var xy = coords[i].split(', ');
            buffer.push(
                new Vector(xy[0], xy[1])
            );
        }
        return buffer;
    };

})(window);
//]]>