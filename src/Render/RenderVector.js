import BaseRender from "./BaseRender";
import Vector2D from "@inwebo/vector/src/Vector2D";

export default class Render2D extends BaseRender {

    /**
     * @param {String|null} context 2d|webgl|webgl2|bitmaprenderer
     * @param {Object} contextAttributes
     * @return {CanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext | RenderingContext}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     */
    getCtx(context= '2d', contextAttributes = {alpha: true}) {
        return this._canvas.getContext(context, contextAttributes);
    }

    _setOrigin() {
        this.setOriginPosition();
    }

    /**
     * Must be overrided
     * @param {[*]} subject
     * @protected
     */
    _draw(...subject) {
        /**
         * @type {Vector2D}
         */
        const particle = Vector2D.fromObject(subject[0]);
        this.getCtx().beginPath();
        this.getCtx().arc(particle.getX(), particle.getY(), 10, 0, 2 * Math.PI, false);
        this.getCtx().fillStyle = `rgba(0,0,0,0.3}`;
        this.getCtx().fill();
    }
}