import Render2D from "./Render2D";
import Vector2D from "@inwebo/vector/src/Vector2D";

export default class RenderVector extends Render2D {

    _setOrigin() {
        // this.setOriginPosition(this._position.ORIGIN_CENTER);
    }

    _clear(...subject) {
        this.getCtx().fillStyle = 'rgba(255,255,255,0.3)';
        this.getCtx().fillRect(0,0,this._canvas.width,this._canvas.height);
    }

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