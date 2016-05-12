import 'normalize.css';
import fastclick from 'fastclick';
import React from 'react';
import { render } from 'react-dom';
import './main.less';
import ReactGame from './component/game.jsx';

const Main = React.createClass({
  render: () => <ReactGame />
});

fastclick.attach(document.body);

render(<Main />, document.getElementById('main'));

