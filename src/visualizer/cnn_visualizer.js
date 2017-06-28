import InputBlock from './input_block';
import ConvBlock from './conv_block';
import PoolBlock from './pool_block';
import FConnBlock from './fconn_block';
import SoftBlock from './soft_block';
import Vector from './vector';
import * as COLORS from '../util_colors';

let SPACING = new Vector(1, 150);
const LABEL_PADDING = 10;
class CnnVisualizer {
  constructor(canvasEl, cnn) {
    this.canvasEl = canvasEl;
    this.cnn = cnn;
    this._generateBlocks();

    this.addressHash = {};

    this._forEach((layerI, colI, blockI) => {
      this.blocks[blockI].address = { layer: layerI, block: colI };
      this.addressHash[`${layerI},${colI}`] = blockI;
    });
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

    for (let i = 0; i < this.blocks.length; i++) {
      // check if mouse contains a position
      if (this.blocks[i].contains(pos)) {
        foundHighlight = true;
        // get the highlights of that block (should return a neuron)
        const highlights = this.blocks[i].getHighlights(pos);
        // check old and current highlights to save draw frames
        if (highlights &&
         (!this.highlights ||
         !(i === this.highlights.block && this.highlights.neuron === highlights.neuron))) {
          this.highlights = highlights;
          this.highlights.block = i;
          this._draw();
        }
        break;
      }
    }

    if (!foundHighlight && this.highlights) {
      this.highlights = undefined;
      this._draw();
    }
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
    this.labels = [];

    for (let i = 0; i < this.cnn.length; i++) {
      let layer = this.cnn[i];
      if (layer.type === 'fc') {
        this.blocks.push(new FConnBlock(layer));
        this.layerInfo.push({x: layer.x, y: layer.y, z: 1, type: layer.type});
        this.labels.push({
          text: this._layerTypeToText(layer.type)
        });
      }
      else {
        for (let x = 0; x < layer.blocks.length; x++) {
          this.blocks.push(this._generateBlock(layer.type, layer.blocks[x], layer.x, layer.y, x));
        }
        this.layerInfo.push({
          x: layer.type === 'softmax' ? 15 : layer.x,
          y: layer.type === 'softmax' ? 15 : layer.y,
          z: layer.z,
          type: layer.type
        });
        this.labels.push({
          text: this._layerTypeToText(layer.type)
        });
      }
    }
    this._positionBlocks();
  }

  _layerTypeToText(type) {
    switch (type) {
      case "fc":
        return "Fully-Connected Layer";
      case "conv":
        return "Convolutional Layer";
      case "pool":
        return "Pooling Layer";
      case "softmax":
        return "Softmax Layer";
      case "input":
        return "Input Layer";
    }
    return "[Unknown Layer]"
  }

  _generateBlock(type, info, x, y, i) {
    if (type === 'input')
      return new InputBlock(info, x, y);
    if (type === 'conv')
      return new ConvBlock(info, x, y);
    if (type === 'pool')
      return new PoolBlock(info, x, y);
    if (type === 'softmax') {
      return new SoftBlock(info, i);
    }
    return null;
  }

  _positionBlocks() {
    const scale = this._getScale();
    let sy = SPACING.y;
    for (let i = 0, b = 0; i < this.layerInfo.length; i++) {
      const layer = this.layerInfo[i];
      const dim = new Vector(scale * layer.x, scale * layer.y);
      this.labels[i].pos = new Vector(this.width / 2 - this.labels[i].text.length * 6, sy - LABEL_PADDING);
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

    if (this.highlights)
      this._drawHighlights(ctx);
    
    // Draw each label
    ctx.font = "1.6em Roboto";
    ctx.fillStyle = COLORS.LAYER_TEXT;
    for (let i = 0; i < this.labels.length; i++) {
      const label = this.labels[i];
      ctx.fillText(label.text, label.pos.x, label.pos.y);
    }
    // Draw each block
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.highlights)
        this.blocks[i].draw(ctx, true, this._getHighlights(i));
      else
        this.blocks[i].draw(ctx, false);
    }
  }

  _drawHighlights(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = COLORS.CONNECTIONS;
    ctx.lineWidth = 1;
    const start = this.blocks[this.highlights.block];
    const startPt = start.getNeuronPosition(this.highlights.neuron);
    for (let i = 0; i < this.highlights.input_neurons.length; i++) {
      const {block, layer, neuron} = this.highlights.input_neurons[i];
      const idx = this.addressHash[`${layer},${block}`];
      const pt = this.blocks[idx].getNeuronPosition(neuron);
      ctx.moveTo(startPt.x, startPt.y);
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
  }

  _getHighlights(blockI) {
    const myAddress = this.blocks[blockI].address;
    const answer = [];
    if (this.highlights.block === blockI)
      answer.push(this.highlights.neuron);
    for (let i = 0; i < this.highlights.input_neurons.length; i++) {
      const address = this.highlights.input_neurons[i];
      if (address.layer === myAddress.layer && address.block === myAddress.block)
        answer.push(address.neuron);
    }
    return answer;
  }

  _forEach(callback) {
    for (let i = 0, b = 0; i < this.layerInfo.length; i++) {
      const layer = this.layerInfo[i];
      for (let j = 0; j < layer.z; j++, b++) {
        const block = this.blocks[b];
        callback(i, j, b, layer, block);
      }
    }
  }
}

export default CnnVisualizer;
