export default {
  LEVEL: {
    BEGINNER: {
      COLUMNS: 9,
      ROWS: 9,
      MINES: 10
    },
    INTERMEDIATE: {
      COLUMNS: 16,
      ROWS: 16,
      MINES: 40
    },
    EXPERT: {
      COLUMNS: 30,
      ROWS: 16,
      MINES: 99
    }
  },
  MAP: {
    STATUS: {
      PLAYING: 'PLAYING',
      WIN: 'WIN',
      LOST: 'LOST'
    }
  },
  CELL: {
    STATUS: {
      UNKNOWN: 'UNKNOWN',
      UNCERTAIN: 'UNCERTAIN',
      MARKED: 'MARKED',
      GRUBBED: 'GRUBBED'
    },
    VALUE: {
      BOMB: -1,
      EMPTY: 0
    }
  }
};
