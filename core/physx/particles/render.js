//<![CDATA[
;(function(window){
    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Render          = function(canvas, simulation){
        var plugin = this;

        plugin.canvas;
        plugin.ctx;
        plugin.simulation;

        var init = function(canvas,simulation){
            plugin.canvas = canvas;
            plugin.ctx = plugin.canvas.getContext( "2d" );
            plugin.simulation = simulation;
            setOrigin();
        };

        plugin.clear = function(){
            plugin.ctx.fillStyle = "whitesmoke";
            plugin.ctx.fillRect(0, 0, plugin.canvas.width,plugin.canvas.height);
        };

        var setOrigin = function(){
            plugin.ctx.translate( 0, plugin.canvas.height );
            plugin.ctx.scale( 1, -1 );
        };

        plugin.draw = function(){
            plugin.clear();
            var l = plugin.simulation.particles.length;
            for(var i = 0 ; i < l ; i++) {
                var particle = plugin.simulation.particles[i];
                particle.draw(plugin.ctx);
            };
        };

        init(canvas,simulation);
    };

})(window);
//]]>