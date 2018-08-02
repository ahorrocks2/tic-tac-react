import React from 'react';
import PropTypes from 'prop-types';
import '../css/ScoreDetails.css';

const ScoreDetails = props => {
  const { name, wins, losses, draws } = props.score;

  return (
    <div>
      { 
        <div className='playerData'>
          <div className='playerName'>
            <p>{name}</p>
          </div>
          
          <div className='playerScores'>
            <p>
              Wins: <span className='wins'>{wins} </span> 
              - Losses: <span className='losses'>{losses} </span> 
              - Draws: <span className='draws'>{draws}</span>
            </p>
          </div>
        </div>
      }
    </div>
  )
};

ScoreDetails.propTypes = {
  score: PropTypes.object.isRequired
};

export default ScoreDetails;
