import Vector from './vector';
import {scaleLinear} from 'd3';

/// ABSTRACT CLASS
class CanvBlock {
  constructor() {
    this.pos = new Vector(0, 0);
    this.dim = new Vector(0, 0);
  }
  setBounds(pos, dim) {
    this.pos = pos;
    this.dim = dim;
  }

  update(info) {

  }

  draw(ctx) {
    ctx.strokeRect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
  }

  _interpolator(min, max) {
    let lerp = scaleLinear()
      .domain([min, max])
      .range(['limegreen', 'darkgreen']);
    lerp.clamp(true);
    return lerp;
  }
}

export default CanvBlock;
