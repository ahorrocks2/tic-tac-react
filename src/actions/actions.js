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
        const scores = leaderboards.map(lb => {
          const wins = leaderboards.filter(l => l.winner === lb.winner);
          return {
            name: lb.winner,
            wins: wins.length
          }
        });
      
        console.log(scores);
        dispatch(getScores(scores));
      });
  }
};