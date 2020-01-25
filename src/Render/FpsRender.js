import Render2D from "./Render2D";

export default class FpsRender extends Render2D {
    /**
     * @param subject
     * @private
     */
    _clear(...subject) {
        this.getCtx().fillStyle = "whitesmoke";
        this.getCtx().fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    /**
     * @param subject
     * @private
     */
    _draw(...subject) {
        const fps = subject[0];

        this.getCtx().fillStyle = "Black";
        this.getCtx().font      = "normal 12px Arial";

        this.getCtx().fillText(fps + " fps", 10, 26);
    }
}