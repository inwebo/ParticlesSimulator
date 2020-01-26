import Vector2D from "@inwebo/vector/src/Vector2D";
import RenderVector from "../src/Render/RenderVector";
import Fps from "../src/Fps/Fps";
import RenderFps from "../src/Render/RenderFps";
import Bounds from "../src/Bounds/Bounds";
import Particle from "../src/Particle/Particle";
import RenderParticle from "../src/Render/RenderParticle";
import RenderBackGround from "../src/Render/RenderBackGround";
import Simulation from "../src/Simulation/Simulation";

document.addEventListener("DOMContentLoaded",() => {

  // region instances
  const layer0       = document.getElementById('layer0');
  const renderBackGround = new RenderBackGround(layer0, {alpha: false});
  const renderParticle = new RenderParticle(layer0, {alpha: false});
  const renderFps    = new RenderFps(layer0);
  const bounds       = new Bounds(new Vector2D(0, 0), new Vector2D(600, 600));
  const simulation = new Simulation(bounds);
  // endregion

  // region subjects
  const fps = new Fps();
  /**
   * @type {Particle}
   */
  // const particle = new Particle(new Vector2D(300,300), new Vector2D(-5,-2.5), null, -1);
  // simulation._particles.push(particle);

  const positions = new Vector2D(0, 600);
  const velocities = new Vector2D(-5, 10);

  const negative = () => {
    return Math.round(Math.random()) * 2 - 1;
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  for (let i = 0; i < 100; i++) {

    const pos = new Vector2D(getRandomInt(positions.getY()), getRandomInt(positions.getY()));
    const vel = new Vector2D(getRandomInt(velocities.getY()) * negative(), getRandomInt(velocities.getY()) * negative());

    const particle = new Particle(pos, vel, new Vector2D(.99,0.25));
    simulation._particles.push(particle);
  }
  // endregion

  const draw = () => {
    setTimeout(() => {
      renderBackGround.draw();
      simulation.step();
      simulation._particles.forEach((particle) => {
        renderParticle.draw(particle);
      });
      renderFps.draw(fps.get());

      requestAnimationFrame(draw);
    }, 1);
  };

  requestAnimationFrame(draw);
});