
import RenderVector from "../src/Render/RenderVector";
import Vector2D from "@inwebo/vector/src/Vector2D";
import Fps from "../src/Fps/Fps";
import FpsRender from "../src/Render/FpsRender";
import Bounds from "../src/Bounds/Bounds";
import Particle from "../src/Particle/Particle";
import RenderParticle from "../src/Render/RenderParticle";

document.addEventListener("DOMContentLoaded",() => {

  // region instances
  const layer0       = document.getElementById('layer0');
  const renderParticle = new RenderParticle(layer0, {alpha: false});
  const renderFps    = new FpsRender(layer0);
  const bounds       = new Bounds(new Vector2D(), new Vector2D(600, 600));
  // endregion

  // region subjects
  const fps = new Fps();
  /**
   * @type {Particle}
   */
  const particle = new Particle(new Vector2D(300,300), new Vector2D(0,2.5));
  // endregion

  const draw = () => {
    setTimeout(() => {
      renderFps.draw(fps.get());

      if(!bounds.inBoundsX(particle.getPosition().getX())) {
        particle.getVelocity().negativeX();
      }

      if(!bounds.inBoundsY(particle.getPosition().getY())) {
        particle.getVelocity().negativeY();
      }

      particle.move();

      renderParticle.draw(particle);

      requestAnimationFrame(draw);
    }, 1);
  };

  requestAnimationFrame(draw);
});