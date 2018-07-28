import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPlayers } from "../actions/actions";
import { validatePlayerNames } from "../logic/logic";

class Players extends Component {
  state = {
    X: "",
    O: "",
    errors: []
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
      this.setState({ X: "", O: "", errors: [] });
    }
  };

  render() {
    let { X, O, errors } = this.state;

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <label>X's Name: </label>
            <input
              type="text"
              id="playerNameX"
              value={X}
              onChange={e => this.handleChange(e, "X")}
            />
          </div>
          <div>
            <label>O's Name: </label>
            <input
              type="text"
              id="playerNameO"
              value={O}
              onChange={e => this.handleChange(e, "O")}
            />
          </div>
          <button type="submit">Start Game</button>
        </form>

        <div>
          {errors.map(e => ( <p key={errors.indexOf(e)} className="errorMessage">{e}</p> ))}
        </div>
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.object
};

export default connect(
  ({ players }) => ({
    players
  }),
  dispatch => {
    return {
      addPlayers(playerNameX, playerNameO) {
        dispatch(addPlayers(playerNameX, playerNameO));
      }
    };
  }
)(Players);

export { Players, validatePlayerNames };
