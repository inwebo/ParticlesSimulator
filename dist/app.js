import Simulation from "../src/Simulation/Simulation";
import Bounds from "../src/Simulation/Bounds";
import Vector from "../src/Vector/Vector";
import Render from "../src/Render/Render";
import Emitter from "../src/Emitters/Emitter";
import Ticker from "../src/Ticker/Ticker";
import Damper from "../src/Damper/Damper";

document.addEventListener("DOMContentLoaded",function() {
  const bounds     = new Bounds(new Vector(0,0), new Vector(600,600));
  const simulation = new Simulation(bounds);
  const canvas = document.getElementById('demo');
  const render = new Render(canvas, simulation);

  const emitter = new Emitter(
    new Vector(300, 300),
    new Vector(2, 2),
    500,
    0,
    -1
  );

  const damper = new Damper(
    new Vector(300, 450),
    10
  );

  simulation.pushEmitter(emitter);
  simulation.pushDamper(damper);

  const draw = function() {
    setTimeout(() => {
      const now = Date.now();
      simulation.step(now);
      render.draw();
      requestAnimationFrame(draw);
    },10);
  };

  // simulation.step(Date.now());
  // simulation.step(Date.now() + 1000000000000);
  // render.draw();

  requestAnimationFrame(draw);


  // const bounds     = new Bounds(new Vector(0,0), new Vector(600,600));
  // const simulation = new Simulation(bounds);
  // const canvas = document.getElementById('demo');
  // const render = new Render(canvas, simulation);
  //
  // const emitter = new Emitter(
  //     new Vector(300, 300),
  //     new Vector(0, 10),
  //     500,
  //     0,
  //     -1
  // );
  //
  // simulation.pushEmitter(emitter);
  //
  // const draw = function(timestamp) {
  //     setTimeout(function() {
  //         simulation.step(timestamp);
  //         render.draw();
  //         requestAnimationFrame(draw);
  //     },60);
  //     // console.table(simulation);
  // };
  // requestAnimationFrame(draw);

  // const ticker = new Ticker(1000);
  //
  // const draw = () => {
  //     setTimeout(function() {
  //         const now = Date.now();
  //         ticker.step(now);
  //         requestAnimationFrame(draw);
  //     },60);
  // };
  //
  // requestAnimationFrame(draw);
});