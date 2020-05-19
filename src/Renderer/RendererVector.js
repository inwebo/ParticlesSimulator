import Renderer2D from '@inwebo/render.js/src/Renderer2D'
import { Vector2D } from "@inwebo/vector";

export default class RendererVector extends Renderer2D {
    /**
     * Must be overrided
     * @param {[Vector2D]} subject
     * @protected
     */
    _draw(...subject) {
        /**
         * @type {Vector2D}
         */
        const particle = subject[0][0];

        this.getCtx().beginPath();
        this.getCtx().fillStyle ='rgba(0,0,0,1)';
        this.getCtx().arc(particle.getX(), particle.getY(), 50, 0, 2 * Math.PI, false);
        this.getCtx().fill();
    }
}