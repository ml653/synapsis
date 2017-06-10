import Vector from './vector';
import CanvBlock from './canv_block';

class GridBlock extends CanvBlock {
  constructor({min, max, neurons}, x, y) {
    super();
    this.min = min;
    this.max = max;
    this.neurons = neurons;
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    for (let i = 0; i < this.neurons.length; i++) {
      
    }
    super.draw(ctx);
  }
}

export default GridBlock;
