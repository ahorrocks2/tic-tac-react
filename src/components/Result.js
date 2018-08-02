import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Result extends Component {
  render () {
    let result = ''; 
    let { turn, won, draw, players } = this.props
    let { X, O } =players;

    if(!X && !O) {
      result = `Please enter player names to begin.`
    } else {
      if (turn) {
        result = `It's ${players[turn.toUpperCase()]}'s turn.`;
      }
      if (won) {
        result = `Yay! ${players[won.toUpperCase()]} won!`
      } else if (draw) {
        result = 'We have a draw!';
      }
    }
    
    return (
      <div className="resultContainer">
        <p>
          {result}
        </p>
      </div>
    );
  }
}

Result.propTypes = {
  won: PropTypes.string,
  turn: PropTypes.string.isRequired,
  draw: PropTypes.bool.isRequired,
  players: PropTypes.object.isRequired
};

export default connect(
  (state) => {
    let { won, turn, draw, players } = state.gameReducer;
    return { won, turn, draw, players }
  })(Result);

export {Result as PureResult};
