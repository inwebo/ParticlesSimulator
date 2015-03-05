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
            ppsValue: window.document.getElementById("emitter-pps-value")
        },
        tail : {
            enabled: window.document.getElementById("tail"),
            size: window.document.getElementById("tail-size")
        }
    };

    var simulation  = new Simulation(bounds);


    var render      = new Render(Demo.canvas, simulation);
    var emitter     = new Emitter(
        // Point
        new Vector(300,32),
        // Velocity
        new Vector(0,0.7),
        // Spay angle
        Math.PI/16,
        // Max particles
        100,
        // Particles per seconds
        30 ,
        // Particles life s
        5,
        60
    );
    simulation.attachEmitter(emitter);

    //region Draw()
    var draw = function(timestamp) {
        setTimeout(function() {
            simulation.step(timestamp);
            ctx.save();
            ctx.drawImage(img,-40,0);
            ctx.restore();
            render.draw();

            requestAnimationFrame(draw);
        },Demo.getFrameInterval(Demo.fps));
    };

    var img = new Image();
    img.src = 'demos/pics/back.png';
    img.onload = function(){
        requestAnimationFrame(draw);
    };
    //requestAnimationFrame(draw);
    //endregion

})(window);
//]]>