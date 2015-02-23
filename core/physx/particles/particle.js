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
    Particles.Particle = function(point, velocity, acceleration, life){
        var plugin          = this;
        plugin.point        = point         || new Particles.Vector(0,0);
        plugin.velocity     = velocity      || new Particles.Vector(0,0);
        plugin.acceleration = acceleration  || new Particles.Vector(0,0);
        // ms, -1 eternal life
        plugin.life         = life || -1;
        plugin.birth        = Date.now();
        plugin.death        = (plugin.life !== -1) ? plugin.birth + plugin.life : -1;

        plugin.move = function(){
            plugin.velocity.add(plugin.acceleration);
            plugin.point.add(plugin.velocity);
        };

        plugin.setPoint =function(x,y){
            plugin.point.x = x;
            plugin.point.y = y;
        };

        plugin.draw = function(ctx){
            ctx.beginPath();
            ctx.arc( plugin.point.x, plugin.point.y, 2, 0, 2 * Math.PI, false );
            if( plugin.life !== -1 ) {
                ctx.fillStyle = "rgba(0,0,0,"+plugin.getLived()/100+")";
            }
            else {
                ctx.fillStyle = "rgba(0,0,0,1)";
            }
            ctx.fill();
        };

        plugin.getLived = function(){
            return ( plugin.death - Date.now() ) / plugin.life * 100;
        };

        plugin.damp = function(damper) {
            plugin.acceleration = damper.getForce(plugin);
        };

    };

})(window);
//]]>