import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPlayers } from "../actions/actions";
import { validatePlayerNames } from "../logic/logic";
import '../css/Players.css';

class Players extends Component {
  state = {
    X: this.props.players.X,
    O: this.props.players.O,
    errors: [],
    formVisible: true
  };

  handleChange = (e, player) => {
    this.setState({
      [player]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = validatePlayerNames(this.state.X, this.state.O);

    if (errors.length > 0) {
      this.setState({ ...this.state, errors });
    } else {
      this.props.addPlayers(this.state.X, this.state.O);
      this.setState({ X: '', O: '', errors: [], formVisible: false });
    }
  };

  render() {
    let { X, O, errors } = this.state;

    return (
      <div>
        { this.state.formVisible && 
          <form className="playersForm" onSubmit={e => this.handleSubmit(e)}>
            <label>X's Name</label>
            <input
              type='text'
              id='playerNameX'
              value={X}
              onChange={e => this.handleChange(e, 'X')}
            />
            <label>O's Name</label>
            <input
              type='text'
              id='playerNameO'
              value={O}
              onChange={e => this.handleChange(e, 'O')}
            />
            <button type='submit'>Start Game</button>
          </form>
        }
        {errors.map(e => ( <p key={errors.indexOf(e)} className='errorMessage'>{e}</p> ))}
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.object
};

export default connect(
  (state) => {
    let { players } = state.gameReducer;
    return { players }
  },
  dispatch => {
    return {
      addPlayers(playerX, playerO) {
        dispatch(addPlayers(playerX, playerO));
      }
    };
  }
)(Players);

export { Players };
