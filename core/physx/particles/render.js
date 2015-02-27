//<![CDATA[
;(function(window){
    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Render          = function(canvas, simulation, sprite,fps){
        var plugin = this;

        plugin.canvas;
        plugin.ctx;
        plugin.simulation;
        plugin.sprite = sprite || null;
        plugin.fps = fps || 1000 / 60;

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
                if( plugin.sprite !== null) {
                    particle.draw(plugin.ctx, plugin.sprite);
                }
                else {
                    particle.draw(plugin.ctx);
                }

            };

            var l = plugin.simulation.dampers.length;
            for(var i = 0 ; i < l ; i++) {
                var damper = plugin.simulation.dampers[i];
                damper.draw(plugin.ctx);
            };
        };

        plugin.attachParticleSprite = function(src){
            var i = new Image();
            i.src = src;
            plugin.sprite = i;

        };

        init(canvas,simulation);
    };

})(window);
//]]>