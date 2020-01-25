
import RenderVector from "../src/Render/RenderVector";
import Vector2D from "@inwebo/vector/src/Vector2D";
import Fps from "../src/Fps/Fps";
import FpsRender from "../src/Render/FpsRender";

document.addEventListener("DOMContentLoaded",function() {

  // region instances
  const layer0 = document.getElementById('layer0');
  const render = new RenderVector(layer0);
  const renderFps = new FpsRender(layer0);
  // endregion

  // region subjects
  const vector = new Vector2D(0, 0);
  const fps    = new Fps();
  // endregion

  const draw = () => {
    setTimeout(() => {
      renderFps.draw(fps.get());
      render.draw(vector);
      requestAnimationFrame(draw);
    }, 10);
  };

  requestAnimationFrame(draw);
});