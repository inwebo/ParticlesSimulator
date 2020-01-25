import Vector2D from "@inwebo/vector/src/Vector2D";
import RenderVector from "./RenderVector";

export default class RenderParticle extends RenderVector {


    /**
     * Must be overrided
     * @param {[Vector2D]} subject
     * @protected
     */
    _draw(...subject) {
        /**
         * @type {Vector2D}
         */
        const particle = subject[0][0].getPosition();

        this.getCtx().beginPath();
        this.getCtx().fillStyle ='rgba(0,0,0,1)';
        this.getCtx().arc(particle.getX(), particle.getY(), 50, 0, 2 * Math.PI, false);
        this.getCtx().fill();
    }
}