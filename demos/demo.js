//console.profile("Hop");
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
    var Bounds  = window.LibreJs.Plugins.Physx.Particles.Bounds.prototype.constructor;
    var Mouse  = window.LibreJs.Plugins.Mouse;

    var bounds = new Bounds(-0,600,-100,300);
    var canvas = window.document.getElementById("demo");
    var ctx    = canvas.getContext("2d");

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
            maxValue: window.document.getElementById("emitter-max-value"),
            pps: window.document.getElementById("emitter-pps"),
            ppsValue: window.document.getElementById("emitter-pps-value"),
            spreadOrientation: window.document.getElementById("spread-orientation"),
            spreadOrientationValue: window.document.getElementById("spread-orientation-value")
        },
        tail : {
            enabled: window.document.getElementById("tail"),
            size: window.document.getElementById("tail-size")
        }
    };

    var particle = new Particle(
        new Vector(0,0),
        new Vector(2,0.5),
        new Vector(0,0),
        -1
    );

    var tailConfig = new TailConfig(25,33);
    //particle.attachTailConfig(tailConfig);

    //var bounds      = new Vector(Demo.canvas.width,Demo.canvas.height);
    var damper      = new Damper(new Vector(300,150),-200);
    var simulation  = new Simulation(bounds);

    //simulation.attachDamper(damper);
    //simulation.attachParticle(particle);

    var render      = new Render(Demo.canvas, simulation);
    var emitter     = new Emitter(
        // Point
        new Vector(300,150),
        // Velocity
        new Vector(0,1),
        // Spray angle
        Math.PI/32,
        // Max particles
        500,
        // Particles per seconds
        50 ,
        // Particles life s
        5,
        60,
        tailConfig,
        // Spread orientation degrees
        0
    );

    simulation.attachEmitter(emitter);
    //region Events

    Demo.canvas.addEventListener('mousemove',function(evt){
        if(simulation.emitters[1]!== undefined) {
            var p = Mouse.getPosition(evt);
            simulation.emitters[1].move(new Vector(p.x, p.y));

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
        simulation.maxParticles = Demo.emitter.max.value;
        Demo.emitter.maxValue.innerHTML  = '['+Demo.emitter.max.value+']';
    });

    Demo.emitter.ppsValue.innerHTML = '[500]';
    Demo.emitter.pps.addEventListener('input',function(evt){
        simulation.emitters[0].pps = Demo.emitter.pps.value;
        Demo.emitter.ppsValue.innerHTML  = '['+Demo.emitter.pps.value+']';
    });

    Demo.emitter.spreadOrientationValue.innerHTML = '[0]';
    Demo.emitter.spreadOrientation.addEventListener('input',function(evt){
        simulation.emitters[0].spreadOrientation = Demo.emitter.spreadOrientation.value;
        Demo.emitter.spreadOrientationValue.innerHTML  = '['+Demo.emitter.spreadOrientation.value+']';
    });

    Demo.damper.x.addEventListener('input',function(evt){
        simulation.dampers[0].position.x = Demo.damper.x.value;
    });
    Demo.damper.y.addEventListener('input',function(evt){
        simulation.dampers[0].position.y = Demo.damper.y.value;
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
        simulation.dampers[0].position.x = Demo.damper.x.value;
    });
    Demo.damper.y.addEventListener('input',function(evt){
        simulation.dampers[0].position.y = Demo.damper.y.value;
    });

    Demo.tail.enabled.addEventListener('change',function(evt){
        //console.log(Demo.tail.enabled.checked);
        if(Demo.tail.enabled.checked) {
            simulation.emitters[0].tailConfig = new TailConfig(
                Demo.tail.size.value
            );
        }
        else {
            simulation.emitters[0].tailConfig = null;
        }
    });
    Demo.tail.size.addEventListener('input',function(evt){
        if(Demo.tail.enabled.checked) {
            simulation.emitters[0].tailConfig = new TailConfig(
                Demo.tail.size.value
            );
        }
    });
    //endregion


    //region Draw()
    var draw = function(timestamp) {
        setTimeout(function() {
            simulation.step(timestamp);
            render.draw();
            requestAnimationFrame(draw);

            //ticker.step(timestamp);

        },Demo.getFrameInterval(Demo.fps));
    };
    requestAnimationFrame(draw);
    //endregion

    //region Mess
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
    //console.log(d);
    var f = function(){setTimeout(function() {
        //console.profileEnd();
    }, 2000)};
    f();
    //endregion

    var error = new Error();
    //console.log(error);
    var scripts = document.getElementsByTagName("script");
    //console.log(scripts[scripts.length-1].getAttribute('src'));


})(window);
//]]>