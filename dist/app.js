// import Simulation from "../src/Simulation/Simulation";
// import Bounds from "../src/Simulation/Bounds";
// import Vector from "../src/Vector/Vector";
// import Render from "../src/Render/Render";
// import Emitter from "../src/Emitters/Emitter";
// import Ticker from "../src/Ticker/Ticker";
// import Damper from "../src/Damper/Damper";
// import BaseRender from "../src/Render/BaseRender";

import RenderVector from "../src/Render/RenderVector";
import Vector2D from "@inwebo/vector/src/Vector2D";

document.addEventListener("DOMContentLoaded",function() {
  const layer0 = document.getElementById('layer0');
  const render = new RenderVector(layer0);
  layer0.addEventListener('mousemove', function(event) {
    if(event.test) {
      alert('ouch, my eye :(');
    }
  });
  const vector = new Vector2D(100, 0);

  // console.log(vector);

  const draw = () => {
    setTimeout(() => {
      render.draw(vector);
      requestAnimationFrame(draw);
    },10);
  };

  requestAnimationFrame(draw);
});