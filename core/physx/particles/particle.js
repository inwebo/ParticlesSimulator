//<![CDATA[
;(function(window){
    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx     || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    /**
     *
     * @param point
     * @param velocity
     * @param acceleration
     * @param life
     * @constructor
     */
    Particles.Particle = function(point, velocity, acceleration, life, tail){
        var plugin          = this;
        plugin.point        = point         || new Particles.Vector(0,0);
        plugin.velocity     = velocity      || new Particles.Vector(0,0);
        plugin.acceleration = acceleration  || new Particles.Vector(0,0);
        // ms, -1 eternal life
        plugin.life         = life || -1;
        plugin.birth        = Date.now();
        plugin.death        = (plugin.life !== -1) ? plugin.birth + plugin.life : -1;
        plugin.tail         = {
            // Total particules into tail
            length:tail || 10,
            // pop interval ms
            interval:10,
            // current particules
            particles:[]
        };
        plugin.timestamp = 0;
        plugin.interval  = 0;

        //region Helpers
        plugin.setPoint = function(x,y){
            plugin.point.x = x;
            plugin.point.y = y;
        };
        plugin.getLived = function(){
            return ( plugin.death - Date.now() ) / plugin.life * 100;
        };
        plugin.isTailed = function() {
            return plugin.tail.length !== -1;
        };
        plugin.stop = function(){
            plugin.velocity.reset();
            plugin.acceleration.reset();
        };
        plugin.setTimestamp = function(timestamp){
            plugin.timestamp = timestamp;
        };
        plugin.resetInterval = function(){
            plugin.interval = 0;
        };
        //endregion

        plugin.damp = function(damper) {
            plugin.acceleration = damper.getForce(plugin);
        };

        plugin.step = function(timestamp){
            plugin.interval += Math.floor(timestamp - plugin.timestamp);
            if( plugin.isTicking() ) {
                if( plugin.isTailed() ) {
                    var v =new Particles.Vector(plugin.point.x, plugin.point.y);
                    plugin.tail.particles.push(v);
                    var l = plugin.tail.length;
                    if( plugin.tail.particles.length > l) {
                        plugin.tail.particles.shift();
                    }
                }

                plugin.resetInterval();
            }
            plugin.setTimestamp(timestamp);
        };

        plugin.isTicking = function(){
            return (plugin.interval > plugin.tail.interval);
        };

        plugin.move = function(){
            plugin.velocity.add(plugin.acceleration);
            plugin.point.add(plugin.velocity);
        };

        plugin.draw = function(ctx,sprite){
            if( plugin.isTailed() ) {
                var l = plugin.tail.length;
                //console.log( plugin.tail.particles[0]);
                for(var i= 0; i< l;i++) {
                    var particle = plugin.tail.particles[i];
                    if( particle !== undefined ) {
                        //console.log(particle);
                        ctx.beginPath();
                        ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI, false);
                        ctx.fillStyle = "rgba(0,0,0,0.25)";
                        ctx.fill();
                    }

                }
            }
            if( sprite !== undefined) {
                ctx.globalAlpha = plugin.getLived() / 100;
                ctx.drawImage(sprite,plugin.point.x,plugin.point.y);
            }
            else {
                ctx.beginPath();
                ctx.arc(plugin.point.x, plugin.point.y, 2, 0, 2 * Math.PI, false);
                if (plugin.life !== -1) {
                    ctx.fillStyle = "rgba(0,0,0," + plugin.getLived() / 100 + ")";
                }
                else {
                    ctx.fillStyle = "rgba(0,0,0,1)";
                }
                ctx.fill();
            }



        };



    };

})(window);
//]]>