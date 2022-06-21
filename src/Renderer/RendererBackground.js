import Renderer2D from '@inwebo/render.js/src/Renderer2D';

export default class RendererBackground extends Renderer2D {
    _clear(...subject) {
        const img = new Image();
        // img.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png";
        this.getCtx().fillStyle = 'rgba(255,255,255,1)';
        this.getCtx().fillRect(0,0,  this._canvas.width,this._canvas.height);
        // this.getCtx().drawImage(img,0,0,600,600);
    }
}