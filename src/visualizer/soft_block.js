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
    this.input_neurons = info.neurons[0].input_neurons;
    let activation = info.neurons[0].activation;
    this.cColor = this._interpolator(0, 1)(activation);
    this.hColor = this._interpolator(0, 1, COLORS.TRANS_LIGHT_NEURON, COLORS.TRANS_DARK_NEURON)(activation);
  }

  getNeuronPosition(i) {
    return this.dim.divide(2).add(this.pos);
  }

  getHighlights(pt) {
    return { neuron: 0, input_neurons: this.input_neurons };
  }
  
  draw(ctx, highlightMode, inputNeurons) {
    super.draw(ctx, highlightMode);
    const isSolid = (!highlightMode) ? true : (inputNeurons && inputNeurons.length !== 0);
    ctx.fillStyle = isSolid ? this.cColor : this.hColor;
    ctx.fillRect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    ctx.fillStyle = isSolid ? COLORS.SOFT_BLOCK_TEXT : COLORS.TRANS_SOFT_BLOCK_TEXT;
    ctx.fillText(this.num.toString(), this.pos.x + this.dim.x / 2 - 5, this.pos.y + this.dim.y / 2 + 5);
  }
}

export default SoftBlock;
