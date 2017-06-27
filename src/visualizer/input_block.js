import Vector from './vector';
import GridBlock from './grid_block';
import {interpolator} from '../../src/utils';

class InputBlock extends GridBlock {
  constructor(info, x, y) {
    super(info, x, y);
  }

  update(info) {
    super.update(info);
    this.cLerp = interpolator(info.min, info.max);
  }

  getHighlights(pt) {
    return undefined;
  }
}

export default InputBlock;
