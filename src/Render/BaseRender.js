import { Render2DEnum } from "./Render2DEnum";

export default class BaseRender {

    /**
     * @param {String|null} context 2d|webgl|webgl2|bitmaprenderer
     * @param {Object} contextAttributes
     * @return {CanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext | RenderingContext}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     */
    getCtx(context = null, contextAttributes = {}) {
        return this._canvas.getContext(context, contextAttributes);
    }

    /**
     * @param {String} position
     */
    setOriginPosition(position = Render2DEnum.ORIGIN_TOP_LEFT) {
        switch (position) {
            case Render2DEnum.ORIGIN_TOP_LEFT:
                break;
            case Render2DEnum.ORIGIN_CENTER:
                this.getCtx().translate(this._canvas.width / 2, this._canvas.height / 2);
                break;

            case Render2DEnum.ORIGIN_BOTTOM_LEFT:
                this.getCtx().translate(0, this._canvas.height);
                this.getCtx().scale(1, -1);
                break;

            case Render2DEnum.ORIGIN_LEFT:
                this.getCtx().translate(0, this._canvas.height / 2);
                break;

            case Render2DEnum.ORIGIN_TOP:
                this.getCtx().translate(this._canvas.width / 2, 0);
                break;

            case Render2DEnum.ORIGIN_TOP_RIGHT:
                this.getCtx().translate(this._canvas.width, 0);
                break;

            case Render2DEnum.ORIGIN_RIGHT:
                this.getCtx().translate(this._canvas.width, this._canvas.height / 2);
                this.getCtx().scale(-1, 1);
                break;

            case Render2DEnum.ORIGIN_BOTTOM_RIGHT:
                this.getCtx().translate(this._canvas.width, this._canvas.height);
                this.getCtx().scale(-1, -1);
                break;

            case Render2DEnum.ORIGIN_BOTTOM:
                this.getCtx().translate(this._canvas.width / 2, this._canvas.height);
                this.getCtx().scale(1, -1);
                break;
        }
    }

    /**
     * May be overrided in sub classes.
     * @private
     */
    _setOrigin() {}

    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this._canvas   = canvas;
        this._position = Render2DEnum;
    }

    /**
     * @param {[]} subject
     */
    _clear(...subject) {}

    /**
     * @param {[*]} subject
     */
    draw(...subject) {
        this.getCtx().save();
        this._clear(subject);
        this._setOrigin();
        this._draw(subject);
        this.getCtx().restore();
    }

    /**
     * Must be overrided
     * @param {[*]} subject
     * @protected
     */
    _draw(...subject) {}
}