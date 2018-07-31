import { getLeaderboards } from '../api/index';
import { calculatePlayerStats } from '../logic/logic';

export const addSymbol = (row, position, symbol, updateLeaderboard) => ({
  type: 'ADD_SYMBOL',
  symbol,
  row,
  position,
  updateLeaderboard
});

export const addPlayers = (playerNameX, playerNameO) => ({
  type: 'ADD_PLAYERS',
  playerNameX,
  playerNameO
});

export const startAgain = () => ({
  type: 'START_AGAIN'
});

export const getScores = (scores) => ({
  type: 'GET_SCORES',
  scores
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