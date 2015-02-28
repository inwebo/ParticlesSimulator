//<![CDATA[
;(function(window){
    /**
     * @param position
     * @param velocity
     * @param acceleration
     * @param life
     * @constructor
     */
    window.LibreJs.Plugins.Physx.Particles.Particle = function(position, velocity, acceleration, life, tail){
        var plugin          = this;
        plugin.position     = position      || new Vector(0,0);
        plugin.velocity     = velocity      || new Vector(0,0);
        plugin.acceleration = acceleration  || new Vector(0,0);
        // ms, -1 eternal life
        plugin.life         = life || -1;
        plugin.birth        = Date.now();
        plugin.death        = (plugin.life !== -1) ? plugin.birth + plugin.life : -1;
        plugin.tail         = {
            // Total particles into tail
            length : tail || -1,
            // capture position ms
            interval : 10,
            // current particles
            particles : [],
            // Trail particles life
            life : 300
        };
        plugin.timestamp = 0;
        plugin.interval  = 0;

        //region Helpers
        plugin.setPoint = function(x,y){
            plugin.position.x = x;
            plugin.position.y = y;
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
        plugin.isTicking = function(){
            return (plugin.interval > plugin.tail.interval);
        };
        //endregion

        //region Physx
        plugin.damp = function(damper) {
            plugin.acceleration = damper.getForce(plugin);
        };
        plugin.move = function(){
            plugin.velocity.add(plugin.acceleration);
            plugin.position.add(plugin.velocity);
        };
        //endregion Physx

        plugin.step = function(timestamp){
            if(plugin.isTailed()){
                plugin.interval += Math.floor(timestamp - plugin.timestamp);
                if( plugin.isTicking() ) {
                    toTail( tailFactory() );
                    cleanTail();
                    plugin.resetInterval();
                }
                plugin.setTimestamp(timestamp);
            }
        };

        var tailFactory = function(){
            return new Particle(
                new Vector(plugin.position.x, plugin.position.y),
                new Vector(),
                new Vector(),
                -1
            );
        };

        var toTail = function(particle){
            plugin.tail.particles.push(particle);

        };

        var cleanTail = function(){
            var l = plugin.tail.length;
            if( plugin.tail.particles.length > l ) {
                plugin.tail.particles.shift();
            }
        };

        /*
        plugin.draw = function(ctx){
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

            ctx.beginPath();
            ctx.arc(plugin.position.x, plugin.position.y, 2, 0, 2 * Math.PI, false);
            if (plugin.life !== -1) {
                ctx.fillStyle = "rgba(0,0,0," + plugin.getLived() / 100 + ")";
            }
            else {
                ctx.fillStyle = "rgba(0,0,0,1)";
            }
            ctx.fill();
        };
        */
    };

    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
    var Particle    = window.LibreJs.Plugins.Physx.Particles.Particle.prototype.constructor;

})(window);
//]]>