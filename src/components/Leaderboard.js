import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScoresForLeaderboard, clearLeaderboards } from '../actions/actions';
import '../css/Leaderboard.css';

class Leaderboard extends Component {
  state = {
    scores: null
  }
  
  componentDidMount() {
    const pollScores = setInterval(() => this.props.getScores(), 5000);
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
          { scores.map(x => 
              (<div key={x.name}>
                {x.name !== 'DRAW' && 
                  <div className='playerData'>
                    <div className='playerName'>
                      <p>{x.name}</p>
                    </div>
                    <div className='playerScores'>
                      <p>
                        Wins: <span className='wins'>{x.wins} </span> 
                        - Losses: <span className='losses'>{x.losses} </span> 
                        - Draws: <span className='draws'>{x.draws}</span>
                      </p>
                    </div>
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