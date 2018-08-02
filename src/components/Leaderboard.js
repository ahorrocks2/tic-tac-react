import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScoresForLeaderboard, clearLeaderboards } from "../actions/actions";
import './Leaderboard.css';

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
    const scores = this.props.scores.sort((a, b) => b.wins - a.wins);

    return (
      <div>
        <h3>LEADERBOARD</h3>
          {
            scores.map(x => 
              (<div key={x.name}>
                {x.name !== 'DRAW' && 
                  <div className="player">
                    <p className="playerName">{x.name}</p>
                    <p className="playerWins">Wins {x.wins}, Losses: {x.losses}, Draws: {x.draws}</p>
                  </div>
                }
              </div>)
            )
          }
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