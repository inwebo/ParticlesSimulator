//<![CDATA[
;(function(window){
    window.LibreJs.Plugins.Physx.Particles.Render = function(canvas, simulation){
        var plugin = this;
        plugin.canvas;
        plugin.ctx;
        plugin.simulation;

        var init = function(canvas, simulation){
            plugin.canvas = canvas;
            plugin.ctx = plugin.canvas.getContext( "2d" );
            plugin.simulation = simulation;
            setOrigin();
        };

        var setOrigin = function(){
            plugin.ctx.translate( 0, plugin.canvas.height );
            plugin.ctx.scale( 1, -1 );
        };

        plugin.clear = function(){
            plugin.ctx.fillStyle = "whitesmoke";
            plugin.ctx.fillRect(0, 0, plugin.canvas.width,plugin.canvas.height);
        };

        plugin.particle = function(particle, callback){
            if( particle.isTailed() ) {
                plugin.tail(particle);
            }
            if(callback === undefined) {
                plugin.defaultParticle(particle);
            }
            else {
                callback.call(plugin, particle);
            }
        };

        plugin.tail = function(particle){
            var l = particle.tail.length;
            for(var i= 0; i< l;i++) {
                //console.log(particle.tail.particles);
                if(particle.tail.particles[i]!==undefined) {
                    var particle = particle.tail.particles[i];
                    //plugin.defaultParticle(particle);
                    plugin.ctx.beginPath();
                    plugin.ctx.arc(particle.position.x, particle.position.y, 2, 0, 2 * Math.PI, false);
                    plugin.ctx.fillStyle = "rgba(255,0,0,1)";
                    plugin.ctx.fill();
                    console.log("draw");
                }
            }
        };

        plugin.defaultParticle = function(particle){
            // Particle
            plugin.ctx.beginPath();
            plugin.ctx.arc(particle.position.x, particle.position.y, 2, 0, 2 * Math.PI, false);
            if (plugin.life !== -1) {
                plugin.ctx.fillStyle = "rgba(0,0,0," + particle.getLived() / 100 + ")";
            }
            else {
                plugin.ctx.fillStyle = "rgba(0,0,0,1)";
            }
            plugin.ctx.fill();
        };

        plugin.draw = function(){
            plugin.clear();
            var l = plugin.simulation.particles.length;
            for(var i = 0 ; i < l ; i++) {
                var particle = plugin.simulation.particles[i];
                //particle.draw(plugin.ctx);
                plugin.particle(particle);
            };

            var l = plugin.simulation.dampers.length;
            for(var i = 0 ; i < l ; i++) {
                var damper = plugin.simulation.dampers[i];
                damper.draw(plugin.ctx);
            };
        };

        init(canvas,simulation);
    };

})(window);
//]]>