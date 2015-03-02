//<![CDATA[
;(function(window){
    /**
     * @param position
     * @param velocity
     * @param acceleration
     * @param life
     * @constructor
     */
    window.LibreJs.Plugins.Physx.Particles.Particle = function(position, velocity, acceleration, life){
        var plugin          = this;
        plugin.position     = position      || new Vector(0,0);
        plugin.velocity     = velocity      || new Vector(0,0);
        plugin.acceleration = acceleration  || new Vector(0,0);
        // ms, -1 eternal life
        plugin.life         = life || -1;
        plugin.birth        = Date.now();
        plugin.death        = (plugin.life !== -1) ? plugin.birth + plugin.life : -1;

        plugin.ticker = null;
        plugin.tail   = null;

        //region Helpers
        plugin.isTailed = function(){
            return plugin.tail !== null;
        };
        plugin.setPoint = function(x,y){
            plugin.position.x = x;
            plugin.position.y = y;
        };
        plugin.getLived = function(){
            return ( plugin.death - Date.now() ) / plugin.life * 100;
        };
        plugin.isAlive  = function(timestamp){
            return plugin.death > timestamp;
        };
        plugin.isEternal= function(){
            return plugin.life === -1;
        };
        plugin.stop = function(){
            plugin.velocity.reset();
            plugin.acceleration.reset();
        };
        //endregion

        plugin.attachTailConfig = function(tailConfig){
            plugin.tail = tailConfig;
            plugin.ticker = new Ticker(plugin.tail.captureInterval);
        };

        //region Physx
        plugin.damp = function(damper) {
            plugin.acceleration = damper.getForce(plugin);
        };
        plugin.move = function(){
            plugin.velocity.add(plugin.acceleration);
            plugin.position.add(plugin.velocity);
        };
        //endregion Physx

    };
    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
    var Particle    = window.LibreJs.Plugins.Physx.Particles.Particle.prototype.constructor;
    var Ticker      = window.LibreJs.Plugins.Ticker.prototype.constructor;
})(window);
//]]>