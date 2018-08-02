import { initialState, leaderboardReducer } from './leaderboardReducer';

const scores = [
  {
    name: 'JANE',
    wins: 2
  },
  {
    name: 'JOHN', 
    wins: 1
  }
];

it('Should get update leaderboard with scores', () => {
  const nextState = leaderboardReducer(initialState, {type: 'GET_SCORES', scores});
  expect(nextState.scores).toEqual(scores);
});

it('Should clear the leaderboard', () => {
  const nextState = leaderboardReducer(initialState, {type: 'DELETE_LEADERBOARD'});
  expect(nextState).toEqual(initialState);
});
