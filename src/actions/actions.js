import { getLeaderboards, deleteLeaderboards } from '../api/index';
import { calculatePlayerStats } from '../logic/logic';

export const addSymbol = (row, position, symbol, updateLeaderboard) => ({
  type: 'ADD_SYMBOL',
  symbol,
  row,
  position,
  updateLeaderboard
});

export const addPlayers = (playerX, playerO) => ({
  type: 'ADD_PLAYERS',
  playerX,
  playerO
});

export const startAgain = () => ({
  type: 'START_AGAIN'
});

export const getScores = (scores) => ({
  type: 'GET_SCORES',
  scores
})

export const deleteScores = () => ({
  type: 'DELETE_SCORES'
})

export const getScoresForLeaderboard = () => {
  return dispatch => {
    return getLeaderboards()
      .then(leaderboards => {
        const scores = calculatePlayerStats(leaderboards);
        dispatch(getScores(scores));
      });
  }
};

export const clearLeaderboards = () => {
  return dispatch => {
    dispatch(deleteScores());
    deleteLeaderboards();
  }
};