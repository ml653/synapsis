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
    ctx.fillStyle = "#999";
    ctx.fillRect(this.pos.x + 2, this.pos.y + 2, this.dim.x, this.dim.y);
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
