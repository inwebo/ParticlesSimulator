import Render2D from "./Render2D";

export default class RenderFps extends Render2D {

    /**
     * @param subject
     * @private
     */
    _draw(...subject) {
        const fps = subject[0];
        this.getCtx().fillStyle = "black";
        this.getCtx().fillRect(8, 0, 36, 14);

        this.getCtx().fillStyle = "white";
        this.getCtx().font      = "normal 12px Arial";

        this.getCtx().fillText(fps + " fps", 10, 10);
    }
}