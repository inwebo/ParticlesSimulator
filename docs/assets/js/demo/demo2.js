import RendererVector from '../../../../src/Renderer/RendererVector'
import Particle from '../../../../src/Particle/Particle'
import { Vector2D } from '@inwebo/vector';
import Simulation from '../../../../src/Simulation/Simulation'
import Bounds from '../../../../src/Bounds/Bounds'

window.addEventListener("DOMContentLoaded", (event) => {
  const renderer   = new RendererVector(document.getElementById('canvas'));
  const particle   = new Particle(new Vector2D(400, 300), new Vector2D(0, 1));
  const simulation = new Simulation(new Bounds(new Vector2D(0, 0), new Vector2D(800, 600)));


  simulation.pushSubject(particle);

  const draw = () => {
    setTimeout(() => {
      simulation.step();
      simulation._particles.forEach((particle) => {
        renderer.draw(particle);
      });

      requestAnimationFrame(draw);
    }, 1);
  };

  requestAnimationFrame(draw);
});
