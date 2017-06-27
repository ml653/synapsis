import Vector from './vector';
import CanvBlock from './canv_block';
import * as COLORS from '../util_colors';

class SoftBlock extends CanvBlock {
  constructor(layer, num) {
    super();
    this.layer = layer;
    this.num = num;
  }

  update(info) {
    super.update(info);
    let {min, max} = info;
    let activation = info.neurons[0].activation;
    console.log(activation);
    this.cColor = this._interpolator(0, 1)(activation);
    this.hColor = this._interpolator(0, 1, COLORS.TRANS_LIGHT_NEURON, COLORS.TRANS_DARK_NEURON)(activation);
  }
  
  draw(ctx, highlightMode) {
    super.draw(ctx, highlightMode);
    ctx.fillStyle = (highlightMode) ? this.hColor : this.cColor;
    ctx.fillRect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    ctx.fillStyle = highlightMode ? COLORS.TRANS_SOFT_BLOCK_TEXT : COLORS.SOFT_BLOCK_TEXT;
    ctx.fillText(this.num.toString(), this.pos.x + this.dim.x / 2 - 5, this.pos.y + this.dim.y / 2 + 5);
  }
}

export default SoftBlock;
