import Vector from './vector';
import CanvBlock from './canv_block';

class GridBlock extends CanvBlock {
  constructor(info, x, y) {
    super();
    this.x = x;
    this.y = y;
    this.update(info);
  }

  update({min, max, neurons}) {
    this.cLerp = this._interpolator(min, max);
    this.hLerp = this._interpolator(min, max, "pink", "red");
    this.neurons = neurons;
  }

  getHighlights(pt) {
    const dx = this.dim.x / this.x;
    const dy = this.dim.y / this.y;
    const delta = pt.subtract(this.pos);
    const x = Math.floor(delta.x / dx);
    const y = Math.floor(delta.y / dy);
    const idx = y * this.x + x;
    const neuron = this.neurons[idx];
    return { neuron: idx, input_neurons: neuron.input_neurons };
  }

  draw(ctx, highlightMode, input_neurons) {
    super.draw(ctx);
    const dx = this.dim.x / this.x;
    const dy = this.dim.y / this.y;
    for (let i = 0; i < this.neurons.length; i++) {
      const xx = i % this.x;
      const yy = Math.floor(i / this.y);
      const lerp = (highlightMode && input_neurons.includes(i)) ? this.hLerp : this.cLerp;
      ctx.fillStyle = lerp(this.neurons[i].activation);
      ctx.fillRect(xx * dx + this.pos.x, yy * dx + this.pos.y, dx, dy);
    }
  }
}

export default GridBlock;
