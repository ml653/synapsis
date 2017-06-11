import Vector from './vector';
import GridBlock from './grid_block';

class InputBlock extends GridBlock {
  constructor(info, x, y) {
    super(info, x, y);
  }

  getHighlights(pt) {
    // input block has no highlights
    return undefined;
  }
}

export default InputBlock;
