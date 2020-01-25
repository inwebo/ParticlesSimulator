import Render2D from "./Render2D";

export default class RenderBackGround extends Render2D {
    _clear(...subject) {
        this.getCtx().fillStyle = 'rgba(255,255,255,0.2)';
        this.getCtx().fillRect(0,0,this._canvas.width,this._canvas.height);
    }
}