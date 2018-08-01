import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScoresForLeaderboard, clearLeaderboards } from "../actions/actions";

class Leaderboard extends Component {
  state = {
    leaderBoardPuller: null
  }
  
  componentDidMount() {
    const puller = setInterval(() => this.props.getScores(), 10000);
    this.setState({ leaderBoardPuller: puller });
  }

  componentWillUnmount() {
    clearInterval(this.state.leaderBoardPuller);
  }

  render() {
    return (
      <div>
        <h3>LEADERBOARD</h3>
        <div>
          {
            this.props.scores.map(x => <div key={x.name}>{x.name !== 'DRAW' && `${x.name} - Wins: ${x.wins}, Losses: ${x.losses}, Draws: ${x.draws}`}</div>)
          }
        </div>
        <button onClick={() => this.props.clearLeaderboards()}>Clear Leaderboard</button>
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
      },
      clearLeaderboards() {
        dispatch(clearLeaderboards());
      }
    };
  }
)(Leaderboard);

export { Leaderboard };