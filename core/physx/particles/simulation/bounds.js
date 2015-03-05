//<![CDATA[
;(function(window){

    window.LibreJs.Plugins.Physx.Particles.Bounds = function(xmin, xmax, ymin, ymax){
        var plugin          = this;
        plugin.x            = {
            min: null,
            max: null
        };
        plugin.y            = {
            min: null,
            max: null
        };
        
        var init = function(xmin, xmax, ymin, ymax){
            plugin.x.min = xmin;
            plugin.x.max = xmax;
            plugin.y.min = ymin;
            plugin.y.max = ymax;
        };

        plugin.isInbounds = function(x,y){
            return (
                (x <= plugin.x.max && x >= plugin.x.min)
                &&
                (y <= plugin.y.max && y >= plugin.y.min)
            );
        };

        init(xmin, xmax, ymin, ymax);
    };

})(window);
//]]>