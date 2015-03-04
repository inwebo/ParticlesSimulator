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

    var tail = new TailConfig(3);

    assert(
        tail.size === 3
        && tail.captureInterval === 33
        && tail.life === tail.size * tail.captureInterval

        ,
        "Got free space");

    assert(tail.gotFreeSpace(),"gotFreeSpace()");
    assert(tail.isEmpty(),"isEmpty()");

    tail.attach(0,0);
    assert(!tail.isEmpty(),"!isEmpty()");
    tail.attach(0,0);
    tail.attach(3,3);
    assert(tail.getLength()===3,"3 elements");
    assert(!tail.gotFreeSpace(),"!gotFreeSpace()");
    var lastVector = tail.getLastElement();
    assert(lastVector.x === 3 && lastVector.y === 3 , "getLastElement()");
    tail.attach(4,4);
    assert(tail.getLength()===3,"3 elements");
    var lastVector = tail.getLastElement();
    assert(lastVector.x === 4 && lastVector.y === 4 , "getLastElement()");
})(window);
//]]>