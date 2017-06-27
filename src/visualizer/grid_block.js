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
    this.hLerp = this._interpolator(min, max, "rgba(50, 205, 50, 0.1)", "rgba(0, 100, 0, 0.1)");
    this.neurons = neurons;
    console.log("UPDATE");
  }

  getNeuronPosition(i) {
    const dx = this.dim.x / this.x;
    const dy = this.dim.y / this.y;
    const xx = i % this.x;
    const yy = Math.floor(i / this.y);
    return new Vector(xx * dx + dx / 2, yy * dy + dy / 2).add(this.pos);
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
    super.draw(ctx, highlightMode);
    const dx = this.dim.x / this.x;
    const dy = this.dim.y / this.y;
    for (let i = 0; i < this.neurons.length; i++) {
      const xx = i % this.x;
      const yy = Math.floor(i / this.y);
      let lerp;
      if (!highlightMode)
        lerp = this.cLerp;
      else
        lerp = input_neurons.includes(i) ? this.cLerp : this.hLerp;
      ctx.fillStyle = lerp(this.neurons[i].activation);
      ctx.fillRect(xx * dx + this.pos.x, yy * dy + this.pos.y, dx, dy);
    }
    ctx.beginPath();
    ctx.strokeStyle = "rgba(135, 211, 124, 1)";
    ctx.lineWidth = 0.25;
    for (let i = 0; i < this.neurons.length; i++) {
      const xx = i % this.x;
      const yy = Math.floor(i / this.y);
      ctx.rect(xx * dx + this.pos.x, yy * dy + this.pos.y, dx, dy);
    }
    ctx.stroke();
  }
}

export default GridBlock;
