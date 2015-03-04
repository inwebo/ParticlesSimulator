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

    var max = 10000;
    var pps = 1000;
    var fps = 60;


    var e1 = new Emitter(
        new Vector(0,0),
        new Vector(1,1),
        null,
        max,
        pps,
        null,
        fps
    );

    assert(e1.getEmitInterval()===(1000/pps),'getEmitInterval()');
    assert(e1.getFrameDuration()===(1/fps)*1000,'getFrameDuration()');
    assert(e1.emitMultipleParticlesByTick(),'emitMultipleParticlesByTick()');

    var max = 10;
    var pps = 1;
    var fps = 60;

    var e1 = new Emitter(
        new Vector(0,0),
        new Vector(1,1),
        null,
        max,
        pps,
        null,
        fps
    );

    assert(!e1.emitMultipleParticlesByTick(),'!emitMultipleParticlesByTick()');


})(window);
//]]>