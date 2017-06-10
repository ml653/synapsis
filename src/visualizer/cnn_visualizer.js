import InputBlock from './input_block';
import ConvBlock from './conv_block';
import PoolBlock from './pool_block';
import FConnBlock from './fconn_block';
import SoftBlock from './soft_block';
import Vector from './vector';

const SPACING = new Vector(10, 50);
class CnnVisualizer {
  constructor(canvasEl, cnn) {
    this.canvasEl = canvasEl;
    this.cnn = cnn;
    this._generateBlocks();
  }

  update(cnn) {
    this.cnn = cnn;
    const ctx = this.canvasEl.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillRect(25, 25, 100, 100);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvasEl.width = width;
    this.canvasEl.height = height;
    this._positionBlocks();
  }

  _generateBlocks() {
    console.log(this.cnn);
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
          this.blocks.push(this._generateBlock(layer.type, layer.blocks[x]));
        }
        this.layerInfo.push({x: layer.x, y: layer.y, z: layer.z, type: layer.type});
      }
    }
    this._positionBlocks();
  }

  _generateBlock(type, info) {
    if (type === 'input')
      return new InputBlock(info);
    if (type === 'conv')
      return new ConvBlock(info);
    if (type === 'pool')
      return new PoolBlock(info);
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
        const pos = new Vector((layer.z + 1) / this.width - block.width / 2, sy);
        block.setBound(pos, dim);
      }
      sy += dim.y + SPACING.y;
    }
  }

  _getScale() {
    let scale = Infinity;
    for (let i = 0; i < this.layerInfo.length; i++) {
      const layer = this.layerInfo[i];
      let curr = this.width / (layer.x * layer.z + SPACING.x);
      if (curr < scale)
        scale = curr;
    }
    return scale;
  }

  _draw() {

  }
}

export default CnnVisualizer;
