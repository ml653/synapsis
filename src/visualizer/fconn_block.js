import Vector from './vector';
import CanvBlock from './canv_block';

class FConnBlock extends CanvBlock {
  constructor(layer) {
    super();
    this.layer = layer;
  }

  setBounds(pos, dim) {
    const sx = 50;
    const centerX = pos.x + dim.x;
    dim.x = (centerX - sx) * 2;

    super.setBounds(new Vector(sx, pos.y), dim);
  }
}

export default FConnBlock;
