const MOUSE_EVENT_IS_LEFT = 1;
const MOUSE_EVENT_IS_RIGHT = 3;

export class Mouse {
  constructor () {
    this.holding = {
      left: false,
      right: false
    };
    document.addEventListener('mousedown', (ev) => {
      if (ev.which === MOUSE_EVENT_IS_LEFT) {
        this.holding.left = true;
      } else if (ev.which === MOUSE_EVENT_IS_RIGHT) {
        this.holding.right = true;
      }
      console.log(this.holding);
    });
    document.addEventListener('mouseup', (ev) => {
      if (ev.which === MOUSE_EVENT_IS_LEFT) {
        this.holding.left = false;
      } else if (ev.which === MOUSE_EVENT_IS_RIGHT) {
        this.holding.right = false;
      }
      console.log(this.holding);
    });
    document.addEventListener('mouseleave', (ev) => {
      console.log('!!!' + ev.which);
    });
  }

  isHoldingLeft () {
    return this.holding.left;
  }
  isHoldingRight () {
    return this.holding.right;
  }
  isHoldingBoth () {
    return this.holding.left && this.holding.right;
  }

}
