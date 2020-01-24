
import RenderVector from "../src/Render/RenderVector";
import Vector2D from "@inwebo/vector/src/Vector2D";

document.addEventListener("DOMContentLoaded",function() {

  const layer0 = document.getElementById('layer0');
  const render = new RenderVector(layer0);
  const vector = new Vector2D(100, 0);

  const draw = () => {
    setTimeout(() => {
      render.draw(vector);
      requestAnimationFrame(draw);
    },10);
  };

  requestAnimationFrame(draw);
});