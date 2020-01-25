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
  const bounds       = new Bounds(new Vector2D(), new Vector2D(600, 600));
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
  const velocities = new Vector2D(-5, 5);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  for (let i = 0; i < 10; i++) {
    const px = getRandomInt(positions.getY());
    const py = getRandomInt(positions.getY());

    const vx = getRandomInt(velocities.getY());
    const vy = getRandomInt(velocities.getY());

    const pos = new Vector2D(px, py);
    const vel = new Vector2D(vx, vy);

    const particle = new Particle(pos, vel);

    simulation._particles.push(particle);
  }




  // endregion

  const draw = () => {
    setTimeout(() => {
      renderBackGround.draw();
      renderFps.draw(fps.get());
      simulation.step();
      simulation._particles.forEach((particle) => {
        renderParticle.draw(particle);
      });

      requestAnimationFrame(draw);
    }, 1);
  };

  requestAnimationFrame(draw);
});