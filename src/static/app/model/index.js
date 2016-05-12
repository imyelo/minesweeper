import _ from 'lodash';
import { EventEmitter } from 'events';
import CONSTANT from '../constant';

export class Map extends EventEmitter {
  constructor (options) {
    super();
    options = _.defaults(options || {}, {
      columns: CONSTANT.LEVEL.BEGINNER.COLUMNS,
      rows: CONSTANT.LEVEL.BEGINNER.ROWS,
      mines: CONSTANT.LEVEL.BEGINNER.MINES
    });
    this.columns = options.columns;
    this.rows = options.rows;
    this.mines = options.mines;
    this.status = CONSTANT.MAP.STATUS.PLAYING;

    // build an empty map (columns * rows)
    this.cells = _.map(_.range(options.columns), function (x) {
      return _.map(_.range(options.rows), function (y) {
        return new Cell({
          x: x,
          y: y
        });
      });
    });

    // place the bombs randomly
    (() => {
      var counter = options.mines;
      while (counter) {
        let cell = this.cells[_.random(options.columns - 1)][_.random(options.rows - 1)];
        if (cell.value !== CONSTANT.CELL.VALUE.BOMB) {
          cell.value = CONSTANT.CELL.VALUE.BOMB;
          counter -= 1;
        }
      }
    })();

    // cache the value of all cells
    _.each(this.cells, (rows, x) => {
      _.each(rows, (cell, y) => {
        let counter = 0;
        if (cell.value !== null) {
          return;
        }
        _.each(_.range(Math.max(x - 1, 0), Math.min(x + 1 + 1, options.columns)), (xx) => {
          _.each(_.range(Math.max(y - 1, 0), Math.min(y + 1 + 1, options.rows)), (yy) => {
            if (this.cells[xx][yy].value === CONSTANT.CELL.VALUE.BOMB) {
              counter += 1;
            }
          });
        });
        cell.value = counter;
      });
    });
  }

  around (cell) {
    return _.without(_.flatten(_.map(_.range(Math.max(cell.x - 1, 0), Math.min(cell.x + 1 + 1, this.columns)), (x) => {
      return _.map(_.range(Math.max(cell.y - 1, 0), Math.min(cell.y + 1 + 1, this.rows)), (y) => {
        return this.cells[x][y];
      });
    })), cell);
  }

  isOver () {
    return ~[CONSTANT.MAP.STATUS.WIN, CONSTANT.MAP.STATUS.LOST].indexOf(this.status);
  }

  grub (cell) {
    if (this.isOver()) {
      return;
    }

    cell.grub();

    if (cell.isBomb()) {
      this.status = CONSTANT.MAP.STATUS.LOST;
    }
    if (cell.isEmpty()) {
      _.chain(this.around(cell)).filter((around) => !around.isBomb() && !around.isGrubbed()).each((around) => {
        this.grub(around);
      }).value();
    }

    this.emit('update');
  }

  mark (cell) {
    if (this.isOver()) {
      return;
    }
    cell.mark();
    this.emit('update');
  }

  detect (cell) {
    if (this.isOver() || !cell.isGrubbed()) {
      return;
    }

    const arounds = this.around(cell);
    const markeds = _.filter(arounds, (around) => around.isMarked());
    const bombs = _.filter(arounds, (around) => around.isBomb())


    if (markeds.length !== bombs.length) {
      return;
    }

    _.chain(arounds).filter((around) => !around.isMarked()).each((around) => {
      this.grub(around);
    }).value();

    this.emit('update');
  }

};


export class Cell {
  constructor (options) {
    options = _.defaults(options || {}, {
      x: 0,
      y: 0
    });
    this.x = options.x;
    this.y = options.y;
    this.value = null;
    this.status = CONSTANT.CELL.STATUS.UNKNOWN;
    return this;
  }

  isUnknown () {
    return this.status === CONSTANT.CELL.STATUS.UNKNOWN;
  }
  isUncertain () {
    return this.status === CONSTANT.CELL.STATUS.UNCERTAIN;
  }
  isMarked () {
    return this.status === CONSTANT.CELL.STATUS.MARKED;
  }
  isGrubbed () {
    return this.status === CONSTANT.CELL.STATUS.GRUBBED;
  }

  isBomb () {
    return this.value === CONSTANT.CELL.VALUE.BOMB;
  }
  isEmpty () {
    return this.value === CONSTANT.CELL.VALUE.EMPTY;
  }

  grub () {
    if (this.isMarked() || this.isGrubbed()) {
      return;
    }
    this.status = CONSTANT.CELL.STATUS.GRUBBED;
  }

  mark () {
    if (this.isGrubbed()) {
      return;
    }
    if (this.isMarked()) {
      this.status = CONSTANT.CELL.STATUS.UNCERTAIN;
      return;
    }
    if (this.isUncertain()) {
      this.status = CONSTANT.CELL.STATUS.UNKNOWN;
      return;
    }
    this.status = CONSTANT.CELL.STATUS.MARKED;
  }
};

