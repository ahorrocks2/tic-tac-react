import React from 'react';
import Board from './Board';
import Result from './Result';
import Leaderboard from './Leaderboard';
import styled from 'styled-components';
import '../css/App.css';

const App = ({className}) => {
  return (
    <div className={className + ' container'}>
      <div className="game">
        <Result />
        <Board />
      </div>
      <div className="leaderboard">
        <Leaderboard />
      </div>
    </div>
  );
}

export default styled(App)`
  font-family: Courier New, Courier, monospace;
  margin: 0 auto;
  width: 200px;
`;
