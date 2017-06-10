import Vector from './vector';

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
    // ctx.fillRect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    ctx.strokeRect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
  }
}

export default CanvBlock;
