//<![CDATA[
;(function(window){
    window.LibreJs.Plugins.Physx.Particles.Render = function(canvas, simulation){
        var plugin = this;
        plugin.canvas       = null;
        plugin.ctx          = null;
        plugin.simulation   = null;

        //region Helpers
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
            plugin.ctx.save();
            plugin.ctx.fillStyle = "whitesmoke";
            plugin.ctx.fillRect(0, 0, plugin.canvas.width,plugin.canvas.height);
            plugin.ctx.restore();
        };
        //endregion

        plugin.particle = function(particle, callback){
            if(callback === undefined) {
                plugin.defaultParticle(particle);
            }
            else {
                callback.call(plugin, particle);
            }
        };

        plugin.defaultParticle = function(particle){
            // Particle
            plugin.ctx.save();
            plugin.ctx.beginPath();
            plugin.ctx.arc(particle.position.x, particle.position.y, 2, 0, 2 * Math.PI, false);
            if (plugin.life !== -1) {
                plugin.ctx.fillStyle = "rgba(0,0,0," + particle.getLived() / 100 + ")";
            }
            else {
                plugin.ctx.fillStyle = "rgba(0,0,0,1)";
            }
            plugin.ctx.fill();
            plugin.ctx.restore();
        };

        plugin.draw = function(){
            plugin.clear();
            plugin.drawParticles();
            //plugin.drawDampers();

        };

        plugin.drawParticles = function(){
            var l = plugin.simulation.particles.length;
            if(l===0) return;
            for(var i = 0 ; i < l ; i++) {
                var particle = plugin.simulation.particles[i];
                plugin.defaultParticle(particle);

                if( particle.isTailed() && !particle.tail.isEmpty() ) {
                    var alpha = Math.floor(particle.getLived())/100;
                    plugin.ctx.save();
                    plugin.ctx.beginPath();
                    plugin.ctx.strokeStyle = "rgba(0,0,0,"+ alpha +")";
                    plugin.ctx.lineWidth = 2;
                    plugin.ctx.moveTo(particle.position.x, particle.position.y);
                    for(var j=particle.tail.particles.length-1; j >0 ; j--) {
                        var vector = particle.tail.particles[j];
                        plugin.ctx.lineTo(vector.x,vector.y);
                    }
                    plugin.ctx.stroke();
                    plugin.ctx.restore();
                }
            }
        };


        plugin.drawDampers = function(){
            var l = plugin.simulation.dampers.length;
            for(var i = 0 ; i < l ; i++) {
                var damper = plugin.simulation.dampers[i];
                //damper.draw(plugin.ctx);
            };
        };

        init(canvas,simulation);
    };

})(window);
//]]>