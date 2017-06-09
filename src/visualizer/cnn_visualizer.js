import InputBlock from './input_block';
import ConvBlock from './conv_block';
import PoolBlock from './pool_block';
import FConnBlock from './fconn_block';
import SoftBlock from './soft_block';

class CnnVisualizer {
  constructor(canvasEl) {
    this.canvasEl = canvasEl;
    this.blocks = [];
  }

  update(cnn) {
    this.cnn = cnn;

    if (this.blocks.length === 0)
      this._generateBlocks();

    this._positionBlocks();
    const ctx = this.canvasEl.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillRect(25, 25, 100, 100);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvasEl.width = width;
    this.canvasEl.height = height;
    this.update(this.cnn);
  }

  _generateBlocks() {
    console.log(this.cnn);

    for (let i = 0; i < this.cnn.length; i++) {
      let layer = this.cnn[i];
      if (layer.type === 'softmax')
        this.blocks.push(new SoftBlock(layer));
      else if (layer.type === 'fc')
        this.blocks.push(new FConnBlock(layer));
      else {
        for (let x = 0; x < layer.blocks.length; x++) {
          let blkInfo = layer.blocks[x];
          this.blocks.push(this._generateBlock(layer.type, blkInfo));
        }
      }
    }
  }

  _generateBlock(type, info) {
    if (type === 'input')
      return new InputBlock(info);
    if (type === 'conv')
      return new ConvBlock(info);
    if (type === 'pool')
      return new PoolBlock(info);
    return null;
  }

  _positionBlocks() {
  }
}

export default CnnVisualizer;
