import Render2D from "./Render2D";
import Vector2D from "@inwebo/vector/src/Vector2D";

export default class RenderVector extends Render2D {

    _setOrigin() {
        this.setOriginPosition(this._position.ORIGIN_BOTTOM_LEFT);
    }

    /**
     * Must be overrided
     * @param {[*]} subject
     * @protected
     */
    _draw(...subject) {
        const particle = Vector2D.fromObject(subject[0]);

        this.getCtx().beginPath();
        this.getCtx().arc(particle.getX(), particle.getY(), 10, 0, 2 * Math.PI, false);
        this.getCtx().fillStyle = `rgba(0,0,0,0.3}`;
        this.getCtx().fill();
    }
}