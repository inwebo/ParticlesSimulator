import Simulation from "../src/Simulation/Simulation";
import Bounds from "../src/Simulation/Bounds";
import Vector from "../src/Vector/Vector";
import Render from "../src/Render/Render";
import Emitter from "../src/Emitters/Emitter";

document.addEventListener("DOMContentLoaded",function() {
    const bounds     = new Bounds(new Vector(0,0), new Vector(600,600));
    const simulation = new Simulation(bounds);
    const canvas = document.getElementById('demo');
    const render = new Render(canvas, simulation);

    const emitter = new Emitter(
        new Vector(300, 300),
        new Vector(0, 1),
        500,
        0,
        60
    );

    simulation.pushEmitter(emitter);

    const draw = function(timestamp) {
        setTimeout(function() {
            simulation.step(timestamp);
            render.draw();
            requestAnimationFrame(draw);
        },1000);
        // console.table(simulation);
    };
    requestAnimationFrame(draw);


});