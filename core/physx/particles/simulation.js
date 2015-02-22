//<![CDATA[
;(function(window){
    var L        = window.LibreJs = window.LibreJs || {};
    var Plugins  = L.Plugins      = L.Plugins      || {};
    var Physx  = Plugins.Physx = Plugins.Physx || {};
    var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};

    Particles.Simulation = function(particles, dampers, bounds){
        var plugin          = this;
        plugin.bounds          = null;
        plugin.particles    = [];
        plugin.dampers      = [];
        plugin.emitters      = [];
        plugin.maxParticles = 0;

        var init = function(particles,dampers,bounds){
            plugin.particles = particles;
            plugin.bounds = bounds;
            plugin.dampers = dampers;
            plugin.maxParticles = plugin.getMaxParticles();
        };

        plugin.step = function(timestamp){
            plugin.cleanParticles();
            var l = plugin.particles.length;
            for(var i = 0 ; i < l ; i++) {
                // Fields
                var m = plugin.dampers.length;
                for( var n = 0; n < m; n++ ) {
                    plugin.particles[i].damp(plugin.dampers[n]);
                };
                plugin.particles[i].move();
            };
            plugin.newParticles();
        };

        plugin.cleanParticles = function(){
            var l = plugin.particles.length;
            var buffer = [];
            for(var i = 0 ; i < l ; i++) {
                if( plugin.isInside(plugin.particles[i]) ) {
                    buffer.push(plugin.particles[i]);
                }
            };
            plugin.particles = buffer;
        };

        plugin.isInside = function(particle) {
            return ((particle.point.x <= plugin.bounds.x) && (particle.point.y <= plugin.bounds.y));
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
        };
        plugin.attachEmitters = function(emitters){
            plugin.emitters = emitters;
        };

        plugin.newParticles = function(){
            var l = plugin.emitters.length ;
            for(var i = 0; i<l ; i++){
                for(var j=0; j <plugin.emitters[i].emittRate;j++) {
                    plugin.particles.push(plugin.emitters[i].emitParticle());
                };
            };
        };

        init(particles,dampers, bounds);

    };

})(window);
//]]>