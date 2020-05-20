import RendererVector from '../../../../src/Renderer/RendererVector'
import Particle from '../../../../src/Particle/Particle'
import { Vector2D } from '@inwebo/vector';

window.addEventListener("DOMContentLoaded", (event) => {
  const renderer = new RendererVector(document.getElementById('canvas'));
  const particle = new Particle(new Vector2D(400,300));

  renderer.draw(particle);
});
