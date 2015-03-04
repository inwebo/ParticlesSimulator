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

    var p = new Particle();
    assert(p.isTailed()===false,'Is Tailed');
    assert(p.isEternal()===true,'Is eternal');
    var now = Date.now();
    assert(p.isAlive(now)===true,'Eternal');
    assert(p.death===-1 && p.life===-1,'Default values');

    var p2 = new Particle(
        new Vector(1,1),
        new Vector(2,2),
        new Vector(3,3),
        // Attention !
        10000
    );

    var tail = new TailConfig();
    p2.attachTailConfig(tail);
    assert(p2.isTailed()===true,'Is Tailed');
    assert(p2.isEternal()===false,'Is eternal');
    var now = Date.now();
    assert(p2.isAlive(now)===true,'Zombified');
    assert(
            (p2.position.x===1 && p2.position.y===1)
        &&  (p2.velocity.x===2 && p2.velocity.y===2)
        &&  (p2.acceleration.x===3 && p2.acceleration.y===3)
        ,'Setters');
    assert(p2.death!==-1 && p2.life!==-1,'Zombified');
    p2.stop();
    assert(
        (p2.position.x===1 && p2.position.y===1)
        &&  (p2.velocity.x===0 && p2.velocity.y===0)
        &&  (p2.acceleration.x===0 && p2.acceleration.y===0)
        ,'Stopped');


    var bounds      = new Bounds(0,600,0,600);

    var p = new Particle(
        new Vector(600,300),
        null,
        null,
        -1
    );


/*

    var p1 = new Particle(
        new Vector(600,300)
    );

    p1.attachTailConfig(
        new TailConfig(1)
    );

    p1.tail.particles.push(new Vector(500,300));
*/

    // Particule est eternelle donc vivante
    var p = new Particle(
        new Vector(600,300),
        null,
        null,
        -1
    );
    assert(p.isEternal(),'isEternal()');
    assert(p.isAlive(),'isAlive()');

    // Particule est vivante
    var p = new Particle(
        new Vector(600,300),
        null,
        null,
        10000
    );
    assert(p.isAlive(Date.now()),'isAlive()');

    // Particule est morte
    var p = new Particle(
        new Vector(600,300),
        null,
        null,
        1
    );
    assert(p.isAlive()===false,'isAlive()');

    // Eternelles !!!
    // Particule est dans les bords sans trainée
    var p = new Particle(
        new Vector(600,300),
        null,
        null,
        -1
    );
    assert(p.isValid(bounds),'is valid');
    // Particule est en dehors des bords sans trainée
    var p = new Particle(
        new Vector(700,300),
        null,
        null,
        -1
    );
    assert(p.isValid(bounds)===false,'is valid');
    // Particule est dans les bords avec trainée dans les bords
    var p = new Particle(
        new Vector(300,300),
        null,
        null,
        -1
    );
    var tail = new TailConfig(1);
    p.attachTailConfig(tail);
    p.tail.attach(300,300);
    assert(p.isValid(bounds)===true,'is valid');
    // Particule est en dehors des bords avec trainée dans les bords
    var p = new Particle(
        new Vector(700,300),
        null,
        null,
        -1
    );
    var tail = new TailConfig(1);
    p.attachTailConfig(tail);
    p.tail.attach(300,300);
    assert(p.isValid(bounds)===true,'is valid');
    // Particule est en dehors des bords avec trainée en dehors des bords
    var p = new Particle(
        new Vector(700,300),
        null,
        null,
        -1
    );
    var tail = new TailConfig(1);
    p.attachTailConfig(tail);
    p.tail.attach(300,700);
    assert(p.isValid(bounds)===false,'is valid');
    // Vivantes

})(window);
//]]>