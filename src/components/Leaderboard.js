import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScoresForLeaderboard, clearLeaderboards } from '../actions/actions';
import ScoreDetails from './ScoreDetails';
import '../css/Leaderboard.css';

class Leaderboard extends Component {
  state = {
    scores: null
  }
  
  componentDidMount() {
    const pollScores = setInterval(() => this.props.getScores(), 2500);
    this.setState({ scores: pollScores });
  }

  componentWillUnmount() {
    clearInterval(this.state.scores);
  }

  render() {
    const scores = this.props.scores.sort((a, b) => b.wins - a.wins);

    return (
      <div>
        <h2>LEADERBOARD</h2>
        <div>
          { scores.length < 1 ? <h3>LOADING SCORES...</h3> : null}
        </div>
          { 
            scores.map(score => score.name !== 'DRAW' && <ScoreDetails key={score.name} score={score} />)
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