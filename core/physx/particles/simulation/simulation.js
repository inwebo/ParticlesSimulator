//<![CDATA[
;(function(window){

    window.LibreJs.Plugins.Physx.Particles.Simulation = function(bounds){
        var plugin          = this;
        plugin.bounds       = null;
        plugin.particles    = [];
        plugin.dampers      = [];
        plugin.emitters     = [];
        plugin.maxParticles = 0;
        plugin.timestamp    = 0;
        
        var init = function(bounds){
            plugin.bounds = bounds;
            plugin.maxParticles = plugin.getMaxParticles();
        };

        //region Getters
        plugin.getMaxParticles = function() {
            var l = plugin.emitters.length ;
            var t = 0;
            for(var i = 0; i<l ; i++){
                t += plugin.emitters[i].maxParticles;

            };
            return t;
        };
        plugin.getMaxParticlesByEmitter = function(){
            return Math.ceil( plugin.maxParticles / plugin.emitters.length );
        };
        //endregion

        //region Setters
        plugin.attachEmitter = function(emitter){
            plugin.emitters.push(emitter);
            plugin.maxParticles = plugin.getMaxParticles();
        };
        plugin.attachEmitters = function(emitters){
            plugin.emitters = emitters;
            plugin.maxParticles = plugin.getMaxParticles();
        };
        plugin.attachDamper = function(damper){
            plugin.dampers.push(damper);
        };
        plugin.attachDampers = function(dampers){
            plugin.dampers = dampers;
        };
        plugin.attachParticle = function(particle){
            plugin.particles.push(particle);
        };
        plugin.attachParticles = function(particle){
            plugin.particles = particle;
        };
        // endregion

        //region Helpers
        plugin.isInbounds = function(vector) {
            return plugin.bounds.isInbounds(vector.x,vector.y);
        };

        plugin.particlesFilter = function(){
            var l = plugin.particles.length;
            var buffer = [];
            for(var i = 0 ; i < l ; i++) {
                var particle = plugin.particles[i];
                if(particle.isTailed() && !particle.tail.isEmpty()) {
                    var lastItem = particle.tail.getLastElement();
                    if( plugin.isInbounds(lastItem) ) {
                        buffer.push(particle);
                    }
                }
                else if( plugin.isInbounds(particle.position) ) {
                    // Eternal
                    if(particle.isEternal()) {
                        buffer.push(particle);
                    }
                    else {
                        // Still alive ?
                        if(particle.isAlive(Date.now())) {
                            buffer.push(particle);
                        }
                    }
                }
/*
                if(
                    particle.isTailed()
                    && particle.tail.particles.length > 0
                ) {
                    var lastItem = particle.tail.getLastElement();
                    console.log(lastItem.x===particle.position.x);
                    if( plugin.bounds.isInbounds(lastItem.x,lastItem.y) ) {

                        //console.log(lastItem.x, lastItem.y);

                    }
                    else {
                        //console.log(lastItem);
                    }
                }

                if( plugin.isInbounds(particle.position)  ) {
                    // Eternal
                    if(particle.isEternal()) {
                        buffer.push(particle);
                    }
                    else {
                        // Still alive ?
                        if(particle.isAlive(Date.now())) {
                            buffer.push(particle);
                        }
                    }
                }
 */
            };
            plugin.particles = buffer;
        };
        //endregion

        plugin.goToStep = function (intStep) {
            for(var i=0; i<=intStep;i++){
                plugin.step(Date.now());
            };
        };
        
        /**
         * Damp & move particles
         * @param timestamp
         */
        plugin.step = function(timestamp){
            plugin.particlesFilter();
            // For each emitters
            var l = plugin.emitters.length ;
            for(var i=0; i<l ; i++) {
                var emitter = plugin.emitters[i];
                emitter.ticker.step(timestamp);
                if(emitter.ticker.isTicking()) {
                    if( emitter.emitMultipleParticlesByTick() ) {
                        var l = emitter.getParticlesByFrame();
                        for(var i=0; i < l;i++) {
                            plugin.addNewParticles();
                        }
                    }
                    else {
                        plugin.addNewParticles();
                    }
                    emitter.ticker.resetInterval();
                }
                emitter.ticker.setTimestamp(timestamp);

            };

            // Damp & move each particles
            var l = plugin.particles.length;
            for(var i = 0 ; i < l ; i++) {
                var particle = plugin.particles[i];
                // Fields
                var m = plugin.dampers.length;
                for( var n = 0; n < m; n++ ) {
                    particle.damp(plugin.dampers[n]);
                };

                if(particle.isTailed()) {
                    var ticker = particle.ticker;
                    ticker.step(timestamp);
                    particle.tail.clean();
                    particle.tail.attach(particle.position.x,particle.position.y);
                    ticker.setTimestamp(timestamp);
                }
                particle.move();

            };
        };

        plugin.addNewParticles = function(){
            var l = plugin.emitters.length ;
            // For each emitters
            for(var i = 0; i < l ; i++){
                // Max particles reached
                if(plugin.particles.length < plugin.maxParticles) {
                    plugin.particles.push(plugin.emitters[i].emit());
                }
            };
        };

        init(bounds);

    };

    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
    var Particle    = window.LibreJs.Plugins.Physx.Particles.Particle.prototype.constructor;

})(window);
//]]>