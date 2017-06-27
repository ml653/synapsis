import Vector from './vector';
import CanvBlock from './canv_block';

class SoftBlock extends CanvBlock {
  constructor(layer) {
    super();
    this.layer = layer;
  }

  update(info) {
    super.update(info);
    let {min, max} = info;
    let activation = info.neurons[0].activation;
    console.log(activation);
    this.cColor = this._interpolator(0, 1)(activation);
    this.hColor = this._interpolator(0, 1, "rgba(50, 205, 50, 0.1)", "rgba(0, 100, 0, 0.1)")(activation);
  }
  
  draw(ctx, highlightMode) {
    super.draw(ctx, highlightMode);
    ctx.fillStyle = (highlightMode) ? this.hColor : this.cColor;
    ctx.fillRect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
  }
}

export default SoftBlock;
