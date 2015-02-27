//<![CDATA[
;(function(window){
    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Simulation = function(particles, dampers, bounds){
        var plugin          = this;
        plugin.bounds       = null;
        plugin.particles    = particles || [];
        plugin.dampers      = dampers   || [];
        plugin.emitters     = [];
        plugin.maxParticles = 0;
        plugin.timestamp        = 0;

        var init = function(particles,dampers,bounds){
            plugin.particles = particles;
            plugin.bounds = bounds;
            plugin.dampers = dampers;
            plugin.maxParticles = plugin.getMaxParticles();
        };

        plugin.getEmittersMaxParticles = function(){
            return Math.ceil( plugin.maxParticles / plugin.emitters.length );
        };

        plugin.step = function(timestamp){
            if( plugin.getTicks(timestamp) > plugin.timestamp ) {
                plugin.timestamp++;
            }
            plugin.cleanParticles();

            // For each emitters
            var l = plugin.emitters.length ;

            for(var i=0; i<l ; i++) {
                var emitter = plugin.emitters[i];
                emitter.step(timestamp);
                if( emitter.isTicking() ) {
                    //var l = emitter.getParticlesByTick();

                    if( emitter.isQueued() ) {
                        var l = emitter.getParticlesByFrame();
                        for(var i=0; i < l;i++) {
                            plugin.newParticles();
                        }
                    }
                    else {
                        plugin.newParticles();
                    }

                    emitter.resetInterval();
                }
                emitter.setTimestamp(timestamp);
            };

            // Damp each particles
            var l = plugin.particles.length;
            for(var i = 0 ; i < l ; i++) {
                // Fields
                var m = plugin.dampers.length;
                for( var n = 0; n < m; n++ ) {
                    plugin.particles[i].damp(plugin.dampers[n]);
                };
                plugin.particles[i].step(timestamp)
                plugin.particles[i].move();
            };
        };

        plugin.getTicks = function(timestamp){
            var date = new Date(timestamp);
            return date.getSeconds() + (date.getMinutes() * 60) + (date.getMinutes() * 3600 );
        };

        plugin.cleanParticles = function(){
            var l = plugin.particles.length;
            var buffer = [];
            for(var i = 0 ; i < l ; i++) {
                if( plugin.isInside(plugin.particles[i]) ) {
                    // Eternal
                    if(plugin.particles[i].death === -1 ) {
                        buffer.push(plugin.particles[i]);
                    }
                    else {
                        // Still alive ?
                        if(plugin.particles[i].death > Date.now() === true) {
                            buffer.push(plugin.particles[i]);
                        }
                    }
                }
            };
            plugin.particles = buffer;

        };

        plugin.isInside = function(particle) {
            if( particle.point.x < 0 || particle.point.y < 0) {
                return false;
            }
            if( particle.point.x > plugin.bounds.x || particle.point.y > plugin.bounds.y) {
                return false;
            }
            return true;
        };

        plugin.getMaxParticles = function() {
            var l = plugin.emitters.length ;
            var t = 0;
            for(var i = 0; i<l ; i++){
                t += plugin.emitters[i].maxParticles;

            };
            return t;
        };

        plugin.attachEmitter = function(emitter){
            plugin.emitters.push(emitter);
            plugin.maxParticles = plugin.getMaxParticles();
        };
        plugin.attachEmitters = function(emitters){
            plugin.emitters = emitters;
            plugin.maxParticles = plugin.getMaxParticles();
        };

        plugin.newParticles = function(){
            var l = plugin.emitters.length ;
            // For each emitters
            for(var i = 0; i < l ; i++){
                // Max particles reached
                if(plugin.particles.length < plugin.maxParticles) {
                    plugin.particles.push(plugin.emitters[i].emit());
                }
            };
        };

        init(particles, dampers, bounds);

    };

})(window);
//]]>