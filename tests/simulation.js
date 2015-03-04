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

    var max = 1000;
    var pps = 10;
    var fps = 60;

    var emitter = new Emitter(
        new Vector(0,0),
        new Vector(1,1),
        null,
        max,
        pps,
        null,
        fps
    );

    var bounds      = new Bounds(0,600,0,600);
    var simulation  = new Simulation(bounds);

    assert(simulation.emitters.length===0,"Empty");
    assert(simulation.dampers.length===0,"Empty");
    assert(simulation.particles.length===0,"Empty");
    assert(simulation.maxParticles===0,"maxParticles");
    assert(simulation.timestamp===0,"timestamp");

    simulation.attachEmitter(emitter);
    assert(simulation.emitters.length===1,"emitters.length");
    simulation.goToStep(2);


})(window);
//]]>