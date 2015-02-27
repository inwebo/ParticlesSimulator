var L        = window.LibreJs = window.LibreJs || {};
var Plugins  = L.Plugins      = L.Plugins      || {};
var Physx  = Plugins.Physx = Plugins.Physx || {};
var Particles  = Plugins.Physx.Particles = Plugins.Physx.Particles   || {};



(function(window) {

    var canvas = window.document.getElementById("demo");
    var ctx     = canvas.getContext("2d");

    var Demo = {
        fps:60,
        getFrameInterval : function(fps){
            return Math.floor(1000 / fps);
        },
        form:document.getElementById("settings-inputs").reset(),
        canvas : canvas,
        ctx : ctx,
        damper : {
            x :window.document.getElementById("damper-x"),
            y :window.document.getElementById("damper-y"),
            mass :window.document.getElementById("damper-mass"),
            massValue :window.document.getElementById("damper-mass-value")
        },
        particle : {
            velocity:{
                x:window.document.getElementById("particle-velocity-x"),
                y:window.document.getElementById("particle-velocity-y")
            },
            life:window.document.getElementById("particle-life"),
            lifeValue:window.document.getElementById("particle-life-value")
        },
        emitter : {
            max: window.document.getElementById("emitter-max"),
            maxValue: window.document.getElementById("emitter-max-value")
        }
    };

    var bounds      = new Particles.Vector(Demo.canvas.width,Demo.canvas.height);
    var damper      = new Particles.Damper(new Particles.Vector(300,150),-200);
    var simulation  = new Particles.Simulation([], [damper], bounds);
    var render      = new Particles.Render(Demo.canvas, simulation, null, Demo.getFrameInterval());
    //render.attachParticleSprite("./sprites/heart.svg");
    var emitter     = new Particles.Emitter(
        // Point
        new Particles.Vector(300,0),
        // Velocity
        new Particles.Vector(0,2),
        // Spay angle
        Math.PI/32,
        // Max particles
        100,
        // Particles per seconds
        10 ,
        // Particles life s
        -1
    );


    var emitter2     = new Particles.Emitter(
        // Point
        new Particles.Vector(150,150),
        // Velocity
        new Particles.Vector(0,2),
        // Spay angle
        Math.PI,
        // Max particles
        10000,
        // Particles per seconds
        10,
        // Particles life s
        5,
        60
    );

    simulation.attachEmitter(emitter);
    //simulation.attachEmitter(emitter2);

    //region Events

    Demo.canvas.addEventListener('mousemove',function(evt){
        if(simulation.emitters[1]!== undefined) {
            var p = getPosition(evt);
            simulation.emitters[1].move(new Particles.Vector(p.x, p.y));
        }

    });

    /**
     * Particle
     */
    Demo.particle.lifeValue.innerHTML = '[5]';
    Demo.particle.life.addEventListener('input',function(evt){
        simulation.emitters[0].particleLife = Demo.particle.life.value;
        Demo.particle.lifeValue.innerHTML  = '['+Demo.particle.life.value+']';
    });

    /**
     * Emitter
     */
    Demo.emitter.maxValue.innerHTML = '[500]';
    Demo.emitter.max.addEventListener('input',function(evt){
        simulation.emitters[0].maxParticles = Demo.emitter.max.value;
        Demo.emitter.maxValue.innerHTML  = '['+Demo.emitter.max.value+']';
    });
    Demo.damper.x.addEventListener('input',function(evt){
        simulation.dampers[0].point.x = Demo.damper.x.value;
    });
    Demo.damper.y.addEventListener('input',function(evt){
        simulation.dampers[0].point.y = Demo.damper.y.value;
    });

    /**
     * Dampers
     */
    Demo.damper.massValue.innerHTML = '[-200]';
    Demo.damper.mass.addEventListener('input',function(evt){
        simulation.dampers[0].mass = Demo.damper.mass.value;
        Demo.damper.massValue.innerHTML  = '['+Demo.damper.mass.value+']';
    });
    Demo.damper.x.addEventListener('input',function(evt){
        simulation.dampers[0].point.x = Demo.damper.x.value;
    });
    Demo.damper.y.addEventListener('input',function(evt){
        simulation.dampers[0].point.y = Demo.damper.y.value;
    });
    //endregion

    /**
     * Main draw function
     */
    var draw = function(timestamp) {
        setTimeout(function() {
            requestAnimationFrame(draw);
            simulation.step(timestamp);
            render.draw();
        },Demo.getFrameInterval(Demo.fps));
    };
    requestAnimationFrame(draw);

    var foo = function(){
        var  plugin = this;
        this.bar = "Hello";

        this.draw = function(callback){
            var c;
            if(callback === undefined) {
                c = this.defaultCallback;
                return c.call(plugin);
            }
            else {
                c = callback;
            }

            var args = Array.prototype.slice.call(arguments, 1);
//            console.log(args);

            return c.call(plugin,args);

        };

        this.defaultCallback = function(){
            return plugin.bar + " world";
        };

    };

    var foo = new foo();
    var d = foo.draw();
    //console.log(d);

    var callback = function(args){
        var plugin = this;
        return plugin.bar +  " " + args[0] + " " + args[1];
    };
    var d = foo.draw(callback," le ", " monde ");
    console.log(d);

})(window);

function getPosition(event)
{
    var x = new Number();
    var y = new Number();
    var canvas = document.getElementById("demo");

    if (event.x != undefined && event.y != undefined)
    {
        x = event.x;
        y = canvas.height-event.y;
    }
    else // Firefox method to get the position
    {
        x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
        y = canvas.height-event.clientY;

    }

    x -= canvas.offsetLeft;

    return {
        x:x,
        y:y
    };

}

