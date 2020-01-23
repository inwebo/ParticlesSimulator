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
    setOriginPosition(position = 'center') {
        switch (position) {
            case 'top_left':
                break;
            case 'center':
                this.getCtx().translate(this._canvas.width / 2, this._canvas.height / 2);
                this.getCtx().scale(0.5, 0.5);
                break;

            case 'bottom_left':
                this.getCtx().translate(0, this._canvas.height);
                this.getCtx().scale(1, -1);
                break;

            case 'left':
                this.getCtx().translate(0, this._canvas.height / 2);
                this.getCtx().scale(1, 0.5);
                break;

            case 'top':
                this.getCtx().translate(this._canvas.width / 2, 0);
                this.getCtx().scale(0.5, 1);
                break;

            case 'top_right':
                this.getCtx().translate(this._canvas.width, 0);
                this.getCtx().scale(1, 1);
                break;

            case 'right':
                this.getCtx().translate(this._canvas.width, this._canvas.height / 2);
                this.getCtx().scale(-1, 0.5);
                break;

            case 'bottom_right':
                this.getCtx().translate(this._canvas.width, 0);
                this.getCtx().scale(1, 1);
                break;
        }
    }

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