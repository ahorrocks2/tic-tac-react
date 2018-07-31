import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScoresForLeaderboard } from "../actions/actions";


class Leaderboard extends Component {
  state = {
    scores: []
  }

  componentDidMount = () => {
    const scores = this.props.getScores();
    this.setState({ scores });
  }

  render() {
    return (
      <div>
        <p>LEADERBOARD</p>
        { this.state.scores }
      </div>
    );
  }
}

Leaderboard.propTypes = {
  scores: PropTypes.array
};

export default connect(
  (state) => {
    let { scores } = state.leaderboardReducer;
    return { scores }
  },
  dispatch => {
    return {
      getScores() {
        dispatch(getScoresForLeaderboard());
      }
    };
  }
)(Leaderboard);

export { Leaderboard };
