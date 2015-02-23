//<![CDATA[
;(function(window){
    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Simulation = function(particles, dampers, bounds){
        var plugin          = this;
        plugin.bounds          = null;
        plugin.particles    = particles || [];
        plugin.dampers      = dampers ||[];
        plugin.emitters      = [];
        plugin.maxParticles = 0;
        plugin.tick = Date.now();

        var init = function(particles,dampers,bounds){
            plugin.particles = particles;
            plugin.bounds = bounds;
            plugin.dampers = dampers;
            plugin.maxParticles = plugin.getMaxParticles();
        };

        plugin.step = function(timestamp){
            plugin.cleanParticles();
            plugin.newParticles();
            var l = plugin.particles.length;
            for(var i = 0 ; i < l ; i++) {
                // Fields
                var m = plugin.dampers.length;
                for( var n = 0; n < m; n++ ) {
                    plugin.particles[i].damp(plugin.dampers[n]);
                };
                plugin.particles[i].move();
            };
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
            var max = plugin.getMaxParticles();

            // For each emitters
            for(var i = 0; i<l ; i++){
                // Emit rate
                for(var j=0; j <plugin.emitters[i].rate;j++) {
                    // Max particles reached
                    if(plugin.particles.length < max) {
                        plugin.particles.push(plugin.emitters[i].emitParticle());
                    }
                };
            };
        };

        init(particles, dampers, bounds);

    };

})(window);
//]]>