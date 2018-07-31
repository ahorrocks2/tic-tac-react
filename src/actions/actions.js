import { getLeaderboards } from '../api/index';

export const addSymbol = (row, position, symbol) => ({
  type: 'ADD_SYMBOL',
  symbol,
  row,
  position
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
        const names = [...new Set(leaderboards.map(lb => lb.winner))]
        const scores = names.map(name => {
          const wins = leaderboards.filter(lb => lb.winner === name);
          return {
            name,
            wins: wins.length
          }
        });
      
        console.log(scores);
        dispatch(getScores(scores));
      });
  }
};