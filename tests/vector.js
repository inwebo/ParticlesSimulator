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

    // Valeurs par défault
    var vector = new Vector();
    assert(vector.x ===0 && vector.y===0,'Default values');

    // Valeurs par défault
    var vector = new Vector(9,10);
    assert(vector.x ===9 && vector.y===10,'Setters');
    // Reset
    vector.reset();
    assert(vector.x ===0 && vector.y===0,'Reseted values');
    // Add
    var v1 = new Vector(1,90);
    var v2 = new Vector(9,10);
    v1.add(v2);
    assert(v1.x ===10 && v1.y===100,'Added values');
})(window);
//]]>