import Vector from './vector';
import {scaleLinear} from 'd3';
import {interpolatorSpec} from '../../src/utils';

/// ABSTRACT CLASS
class CanvBlock {
  constructor() {
    this.pos = new Vector(0, 0);
    this.dim = new Vector(0, 0);
    this.highlighted = false;
  }

  setBounds(pos, dim) {
    this.pos = pos;
    this.dim = dim;
  }

  contains(pt) {
    const end = this.pos.add(this.dim);
    return pt.x >= this.pos.x && pt.x <= end.x &&
      pt.y >= this.pos.y && pt.y <= end.y;
  }

  getHighlights(pt) {
    return undefined;
  }

  update(info) {

  }

  getNeuronPosition(idx) {
    return undefined;
  }

  draw(ctx, highlightMode) {
    ctx.textAlign = 'left';
    ctx.font = 'bold 12px Roboto';
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.strokeStyle = highlightMode ? "rgba(153, 153, 153, .2)" : "#999";
    ctx.lineWidth = 4;
    ctx.moveTo(this.pos.x, this.pos.y + this.dim.y);
    ctx.lineTo(this.pos.x + this.dim.x, this.pos.y + this.dim.y);
    ctx.lineTo(this.pos.x + this.dim.x, this.pos.y);
    ctx.stroke();
  }
}

CanvBlock.prototype._interpolator = (min, max, colorA = 'limegreen', colorB = '#145B19') => (
  interpolatorSpec(min, max, colorA, colorB)
);

export default CanvBlock;
