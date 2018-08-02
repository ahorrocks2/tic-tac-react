import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Result extends Component {
  render () {
    let result = ''; 
    let { X, O } = this.props.players;

    if(!X && !O) {
      result = `Please enter player names to begin.`
    } else {
      if (this.props.turn) {
        const turn = this.props.turn.toUpperCase();
        result = `It's ${this.props.players[turn]}'s turn.`;
      }
      if (this.props.won) {
        const won = this.props.won.toUpperCase();
        result = `Yay! ${this.props.players[won]} won!`
      } else if (this.props.draw) {
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
