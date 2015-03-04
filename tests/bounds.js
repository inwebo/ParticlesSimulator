//<![CDATA[
(function(window) {

    var Vector      = window.LibreJs.Plugins.Physx.Particles.Vector.prototype.constructor;
    var Simulation  = window.LibreJs.Plugins.Physx.Particles.Simulation.prototype.constructor;
    var Damper      = window.LibreJs.Plugins.Physx.Particles.Damper.prototype.constructor;
    var Emitter     = window.LibreJs.Plugins.Physx.Particles.Emitter.prototype.constructor;
    var Render      = window.LibreJs.Plugins.Physx.Particles.Render.prototype.constructor;
    var Particle    = window.LibreJs.Plugins.Physx.Particles.Particle.prototype.constructor;
    var Ticker      = window.LibreJs.Plugins.Ticker.prototype.constructor;
    var TailConfig  = window.LibreJs.Plugins.Physx.Particles.Tail.prototype.constructor;
    var Simulation  = window.LibreJs.Plugins.Physx.Particles.Simulation.prototype.constructor;
    var Bounds      = window.LibreJs.Plugins.Physx.Particles.Bounds.prototype.constructor;

    var pIn = new Particle(
        new Vector(10, 10)
    );

    var pOut = new Particle(
        new Vector(6000, 6000)
    );

    var pBorder = new Particle(
        new Vector(600, 600)
    );

    var bounds = new Bounds(0, 600, 0, 600);

    assert(bounds.isInbounds(pIn.position.x,pIn.position.y),'Particle in');
    assert(!bounds.isInbounds(pOut.position.x,pOut.position.y),'Particle out');
    assert(bounds.isInbounds(pBorder.position.x,pBorder.position.y),'Particle border');

})(window);
//]]>