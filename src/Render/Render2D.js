import BaseRender from "./BaseRender";

export default class Render2D extends BaseRender {

    /**
     * @param {String|null} context 2d|webgl|webgl2|bitmaprenderer
     * @param {Object} contextAttributes
     * @return {CanvasRenderingContext2D}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     */
    getCtx(context= '2d', contextAttributes = {alpha: true}) {
        return this._canvas.getContext(context, contextAttributes);
    }

    /**
     * @param {[]} subject
     */
    _clear(...subject) {}

    /**
     * Must be overrided
     * @param {[*]} subject
     * @protected
     */
    _draw(...subject) {}
}