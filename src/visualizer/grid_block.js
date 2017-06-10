import Vector from './vector';
import CanvBlock from './canv_block';
import {scaleLinear} from 'd3';

class GridBlock extends CanvBlock {
  constructor({min, max, neurons}, x, y) {
    super();
    this.min = min;
    this.max = max;
    this.neurons = neurons;
    this.x = x;
    this.y = y;
    this.cLerp = scaleLinear()
      .domain([this.min, this.max])
      .range(['limegreen', 'darkgreen']);
  }

  draw(ctx) {
    const dx = this.dim.x / this.x;
    const dy = this.dim.y / this.y;
    for (let i = 0; i < this.neurons.length; i++) {
      const xx = i % this.x;
      const yy = Math.floor(i / this.y);
      ctx.strokeRect(xx * dx + this.pos.x, yy * dx + this.pos.y, dx, dy);
    }
    super.draw(ctx);
  }
}

export default GridBlock;
