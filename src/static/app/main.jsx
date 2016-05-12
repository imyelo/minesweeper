import 'normalize.css';
import fastclick from 'fastclick';
import React from 'react';
import { render } from 'react-dom';
import Game from './component/game.jsx';

const Main = React.createClass({
  render: () => <Game />
});

fastclick.attach(document.body);

render(<Main />, document.getElementById('main'));

