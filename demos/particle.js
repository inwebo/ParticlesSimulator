//console.profile("Hop");
//<![CDATA[
(function(window) {
    //region Alias
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
    var Navigator  = window.LibreJs.Plugins.Physx.Particles.Navigator.prototype.constructor;
    var Mouse  = window.LibreJs.Plugins.Mouse;
    //endregion

    //region Démo
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
        },
        // svg path node
        path : window.document.getElementById("path-1")
    };
    //endregion

    var particle = new Particle(
        new Vector(300,150),
        new Vector(0,0),
        new Vector(0,0),
        -1
    );
/*
    console.log(Demo.path);
    console.log(Demo.path.getAttribute('d'));

    var coor = Demo.path.getAttribute('d');
    var coords = coor.split(' ');
    coords.shift();
//    console.log(coords);
    var buffer = [];
    for(var i=0; i<coords.length;i++) {
        var xy = coords[i].split(',');
        buffer.push(
            new Vector(xy[0], xy[1])
        );
    }
*/
    console.log(Navigator.prototype.extractPath(Demo.path));

    var tailConfig = new TailConfig(20,33);
    particle.attachTailConfig(tailConfig);
    var to = new Vector(10,150);
    Demo.canvas.addEventListener('mousemove',function(evt){
        var speed = 100;
        var pos = Mouse.getPosition(evt);
        to = new Vector(pos.x,pos.y);
        coordinates = Vector.prototype.getCoordinate(particle.position, to);
        steps = new Vector(coordinates.x/speed, coordinates.y/speed);
    });

    Demo.canvas.addEventListener('click',function(evt){
            var speed = 20;
            var pos = Mouse.getPosition(evt);
            to = new Vector(pos.x,pos.y);
            coordinates = Vector.prototype.getCoordinate(particle.position, to);
            steps = new Vector(coordinates.x/speed, coordinates.y/speed);

    });

    var coordinates = Vector.prototype.getCoordinate(particle.position, to);
    var speed = Vector.prototype.getDistance(particle.position, to);
    var steps = new Vector(coordinates.x/speed, coordinates.y/speed);

    var simulation  = new Simulation(bounds);
    simulation.particles.push(particle);

    var render      = new Render(Demo.canvas, simulation);

    //region Draw()
    var draw = function(timestamp) {
        setTimeout(function() {
            simulation.step(timestamp);
            render.draw();
            // 1 node
            if(simulation.particles[0] !== undefined) {
                var particle =simulation.particles[0];
                render.ctx.save();
                render.setOrigin();

                var x = particle.position.x;
                var y = particle.position.y;

                if(coordinates.x > 0) {
                    if(particle.position.x < to.x) {
                        particle.position.x += steps.x;
                    }
                }
                else if(coordinates.x < 0) {
                    if(particle.position.x > to.x) {
                        particle.position.x += steps.x;
                    }
                }

                if(coordinates.y > 0) {
                    if(particle.position.y < to.y) {
                        particle.position.y += steps.y;
                    }
                }
                else if(coordinates.y < 0) {
                    if(particle.position.y > to.y) {
                        particle.position.y += steps.y;
                    }
                }

                render.ctx.fillText("x : "+x,x,20);
                render.ctx.fillText("y : "+y,20,300-y);
                render.ctx.restore();
            }

            requestAnimationFrame(draw);
        },Demo.getFrameInterval(Demo.fps));
    };
    requestAnimationFrame(draw);
    //endregion



})(window);
//]]>