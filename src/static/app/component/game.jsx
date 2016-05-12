import _ from 'lodash';
import React from 'react';
import { Map, Cell } from '../model';
import classnames from 'classnames';
import './game.less';

const MOUSE_EVENT_IS_LEFT = 1;
const MOUSE_EVENT_IS_RIGHT = 3;

const ReactCell = React.createClass({
  getInitialState() {
    return {
      holdingLeft: false,
      holdingRight: false
    };
  },
  propTypes: {
    onGrub: React.PropTypes.func,
    onMark: React.PropTypes.func,
    onDetect: React.PropTypes.func,
    cell: React.PropTypes.object
  },
  handleMouseDown(e) {
    const { cell } = this.props;
    if (e.nativeEvent.which === MOUSE_EVENT_IS_LEFT) {
      this.setState({
        holdingLeft: true
      });
    } else if (e.nativeEvent.which === MOUSE_EVENT_IS_RIGHT) {
      if (this.state.holdingLeft) {
        this.setState({
          holdingRight: true
        });
      } else {
        this.props.onMark(cell);
      }
    }
  },
  handleMouseLeave(e) {
    this.setState({
      holdingLeft: false,
      holdingRight: false
    })
  },
  handleMouseUp(e) {
    const { cell } = this.props;
    if (e.nativeEvent.which === MOUSE_EVENT_IS_LEFT) {
      this.setState({
        holdingLeft: false
      });
    } else if (e.nativeEvent.which === MOUSE_EVENT_IS_RIGHT) {
      this.setState({
        holdingRight: false
      });
    }
    if (this.state.holdingLeft && this.state.holdingRight) {
      this.props.onDetect(cell);
    }
    if (this.state.holdingLeft && !this.state.holdingRight) {
      this.props.onGrub(cell);
    }
  },
  render() {
    const { cell, map } = this.props;
    const isOver = map.isOver();
    const isGrubbed = cell.isGrubbed();
    const isBomb = cell.isBomb();
    const value = cell.value;
    return (<div
      className={classnames('cell', cell.status.toLowerCase(), {
        bomb: isGrubbed && isBomb
      })}
      onMouseDown={this.handleMouseDown}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      onMouseOver={this.handleMouseOver}
      onMouseUp={this.handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
      >
      { isGrubbed || isOver ?
          (isBomb ?
            '*' :
            (value > 0 ?
              value :
              '')) :
          null }
    </div>)
  }
});

const ReactGame = React.createClass({
  getInitialState() {
    return {
      map: new Map()
    };
  },
  componentDidMount() {
    this.state.map.on('update', () => {
      this.forceUpdate();
    });
  },
  grub(cell) {
    this.state.map.grub(cell);
  },
  mark(cell) {
    this.state.map.mark(cell);
  },
  detect(cell) {
    this.state.map.detect(cell);
  },
  render() {
    const { map } = this.state;

    return (<div className="game">
      {
        _.map(map.cells, (column, x) => {
          return <div className="column" key={x}>
            {
              _.map(column, (cell, y) => {
                return <ReactCell map={map} cell={cell} key={[x, y].join('-')} onMark={this.mark} onGrub={this.grub} onDetect={this.detect} />
              })
            }
          </div>
        })
      }
    </div>)
  }
});

export default ReactGame;
