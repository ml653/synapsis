class CnnVisualizer {
  constructor(canvasEl) {
    this.canvasEl = canvasEl;
    this.blocks = [];
  }

  update(cnn) {
    if (this.blocks.length === 0)
      this._generateBlocks(cnn);
    const ctx = this.canvasEl.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillRect(25, 25, 100, 100);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvasEl.width = width;
    this.canvasEl.height = height;
  }

  _generateBlocks(cnn) {
  }
}

export default CnnVisualizer;
