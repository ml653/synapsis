import Vector from './vector';
import {scaleLinear} from 'd3';

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
