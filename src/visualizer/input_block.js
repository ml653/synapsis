import Vector from './vector';
import GridBlock from './grid_block';

class InputBlock extends GridBlock {
  constructor(info, x, y) {
    super(info, x, y);
  }

  update(info) {
    super.update(info);
    this.cLerp = this._interpolator(info.min, info.max, "white", "darkgreen");
  }

  getHighlights(pt) {
    // input block has no highlights
    return undefined;
  }
}

export default InputBlock;
