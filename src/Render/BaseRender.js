const RENDER2D_ORIGIN_TOP          = "RENDER2D_ORIGIN_TOP";
const RENDER2D_ORIGIN_TOP_RIGHT    = "RENDER2D_ORIGIN_TOP_RIGHT";
const RENDER2D_ORIGIN_RIGHT        = "RENDER2D_ORIGIN_RIGHT";
const RENDER2D_ORIGIN_BOTTOM_RIGHT = "RENDER2D_ORIGIN_BOTTOM_RIGHT";
const RENDER2D_ORIGIN_BOTTOM       = "RENDER2D_ORIGIN_BOTTOM";
const RENDER2D_ORIGIN_BOTTOM_LEFT  = "RENDER2D_ORIGIN_BOTTOM_LEFT";
const RENDER2D_ORIGIN_LEFT         = "RENDER2D_ORIGIN_LEFT";
const RENDER2D_ORIGIN_TOP_LEFT     = "RENDER2D_ORIGIN_TOP_LEFT";
const RENDER2D_ORIGIN_CENTER       = "RENDER2D_ORIGIN_CENTER";

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
    setOriginPosition(position = RENDER2D_ORIGIN_TOP_LEFT) {
        switch (position) {
            case RENDER2D_ORIGIN_TOP_LEFT:
                break;
            case RENDER2D_ORIGIN_CENTER:
                this.getCtx().translate(this._canvas.width / 2, this._canvas.height / 2);
                this.getCtx().scale(0.5, 0.5);
                break;

            case RENDER2D_ORIGIN_BOTTOM_LEFT:
                this.getCtx().translate(0, this._canvas.height);
                this.getCtx().scale(1, -1);
                break;

            case RENDER2D_ORIGIN_LEFT:
                this.getCtx().translate(0, this._canvas.height / 2);
                this.getCtx().scale(1, 0.5);
                break;

            case RENDER2D_ORIGIN_TOP:
                this.getCtx().translate(this._canvas.width / 2, 0);
                this.getCtx().scale(0.5, 1);
                break;

            case RENDER2D_ORIGIN_TOP_RIGHT:
                this.getCtx().translate(this._canvas.width, 0);
                this.getCtx().scale(1, 1);
                break;

            case RENDER2D_ORIGIN_RIGHT:
                this.getCtx().translate(this._canvas.width, this._canvas.height / 2);
                this.getCtx().scale(-1, 0.5);
                break;

            case RENDER2D_ORIGIN_BOTTOM_RIGHT:
                this.getCtx().translate(this._canvas.width, 0);
                this.getCtx().scale(1, 1);
                break;

            case RENDER2D_ORIGIN_BOTTOM:
                this.getCtx().translate(this._canvas.width / 2, 1);
                this.getCtx().scale(0.5, 1);
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
        this._canvas = canvas;
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
        this._setOrigin();
        this._clear(subject);
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