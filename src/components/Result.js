import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Result extends Component {
  render () {
    let result = ''; 
    
    if(this.props.players.O.name === '' || this.props.players.X.name === '') {
      result = `Please enter player names to begin the game.`
    } else {
      if (this.props.turn) {
        const turn = this.props.turn.toUpperCase();
        result = `It's ${this.props.players[turn].name}'s turn.`;
      }
      if (this.props.won) {
        const won = this.props.won.toUpperCase();
        result = `Yay! ${this.props.players[won].name} won!`
      } else if (this.props.draw) {
        result = 'We have a draw!';
      }
    }
    
    return (
      <div>
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
  players: PropTypes.shape({
    X: PropTypes.shape({
      name: PropTypes.string}), 
    O: PropTypes.shape({
      name: PropTypes.string})
  }).isRequired
};

export default connect(
  ({won, turn, draw, players}) => ({
    won, turn, draw, players
  })
)(Result);

export {Result as PureResult};
