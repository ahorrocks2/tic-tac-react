import React from 'react';
import Board from './Board';
import Result from './Result';
import Players from './Players';
import Leaderboard from './Leaderboard';
import styled from 'styled-components';
import './App.css';

const App = ({className}) => {
  return (
    <div className={className}>
      <Result />
      <Board />
      <Players />
      <Leaderboard />
    </div>
  );
}

export default styled(App)`
  font-family: Courier New, Courier, monospace;
  margin: 0 auto;
  width: 200px;
`;
