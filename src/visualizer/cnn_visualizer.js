import InputBlock from './input_block';
import ConvBlock from './conv_block';
import PoolBlock from './pool_block';
import FConnBlock from './fconn_block';
import SoftBlock from './soft_block';
import Vector from './vector';

let SPACING = new Vector(1, 150);
class CnnVisualizer {
  constructor(canvasEl, cnn) {
    this.canvasEl = canvasEl;
    this.cnn = cnn;
    this._generateBlocks();
  }

  update(cnn) {
    this.cnn = cnn;
    for (let i = 0, b = 0; i < this.cnn.length; i++) {
      let layer = this.cnn[i];
      if (layer.type === 'fc') {
        this.blocks[b++].update(layer);
      }
      else {
        for (let x = 0; x < layer.blocks.length; x++) {
          this.blocks[b++].update(layer.blocks[x]);
        }
      }
    }
    this._draw();
  }

  mousemove(x, y) {
    const pos = new Vector(x, y);
    this._setHighlights(pos);
  }

  _setHighlights(pos) {
    let foundHighlight = false;

    for (let i = 0, b = 0; i < this.layerInfo.length && !foundHighlight; i++) {
      const layer = this.layerInfo[i];
      for (let j = 0; j < layer.z && !foundHighlight; j++, b++) {
        const block = this.blocks[b];
        if (block.contains(pos)) {
          // get the highlights of that block (should return a neuron)
          const highlights = block.getHighlights(pos);
          // check old and current highlights to save draw frames
          if (this.highlights && i !== this.highlights.layer &&
            j !== this.highlights.block && this.highlights.neuron !== highlights.neuron) {
              this.highlights = highlights;
              this.highlights.layer = i;
              this.highlights.block = j;
              this._draw();
              foundHighlight = true;
          }
        }
      }
    }
    if (!foundHighlight)
      this.highlights = undefined;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvasEl.width = width;
    this.canvasEl.height = height;
    this._positionBlocks();
  }

  _generateBlocks() {
    this.blocks = [];
    this.layerInfo = [];

    for (let i = 0; i < this.cnn.length; i++) {
      let layer = this.cnn[i];
      if (layer.type === 'fc') {
        this.blocks.push(new FConnBlock(layer));
        this.layerInfo.push({x: layer.x, y: layer.y, z: 1, type: layer.type});
      }
      else {
        for (let x = 0; x < layer.blocks.length; x++) {
          this.blocks.push(this._generateBlock(layer.type, layer.blocks[x], layer.x, layer.y));
        }
        this.layerInfo.push({
          x: layer.type === 'softmax' ? 15 : layer.x,
          y: layer.type === 'softmax' ? 15 : layer.y,
          z: layer.z,
          type: layer.type
        });
      }
    }
    this._positionBlocks();
  }

  _generateBlock(type, info, x, y) {
    if (type === 'input')
      return new InputBlock(info, x, y);
    if (type === 'conv')
      return new ConvBlock(info, x, y);
    if (type === 'pool')
      return new PoolBlock(info, x, y);
    if (type === 'softmax')
      return new SoftBlock(info);
    return null;
  }

  _positionBlocks() {
    const scale = this._getScale();
    let sy = SPACING.y;
    for (let i = 0, b = 0; i < this.layerInfo.length; i++) {
      const layer = this.layerInfo[i];
      const dim = new Vector(scale * layer.x, scale * layer.y);
      for (let j = 0; j < layer.z; j++, b++) {
        const block = this.blocks[b];
        const pos = new Vector(this.width / (layer.z + 1) * (j + 1) - dim.x / 2, sy);
        block.setBounds(pos, dim);
      }
      sy += dim.y + SPACING.y;
    }
    this._draw();
  }

  _getScale() {
    let scale = Infinity;
    for (let i = 0; i < this.layerInfo.length; i++) {
      const layer = this.layerInfo[i];
      let curr = this.width / ((layer.x + SPACING.x) * (layer.z + 1));
      if (curr < scale)
        scale = curr;
    }
    return scale;
  }

  _draw() {
    const ctx = this.canvasEl.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.blocks.length; i++)
      this.blocks[i].draw(ctx, this.highlights);
    
    for (let i = 0, b = 0; i < this.layerInfo.length; i++) {
      const layer = this.layerInfo[i];
      for (let j = 0; j < layer.z; j++, b++) {
        const block = this.blocks[b];
        console.log(i, j);
        // block.draw(ctx, this._getHighlights(layer, i, j, b));
      }
    }
  }

  _getHighlights(layerI, blockI) {
    const answer = [];
    const h = this.highlights;
    if(h.)
    for (let i = 0; i < this.highlights.n.length; i++) {
      answer.push(this.blocks[i]);
    }
    return answer;
  }

  _forEach(callback) {
    for (let i = 0, b = 0; i < this.layerInfo.length; i++) {
      const layer = this.layerInfo[i];
      for (let j = 0; j < layer.z; j++, b++) {
        const block = this.blocks[b];
        callback(i, b, layer, block);
      }
    }
  }
}

export default CnnVisualizer;
