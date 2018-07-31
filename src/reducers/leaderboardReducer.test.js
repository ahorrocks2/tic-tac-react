import { initialState, leaderboardReducer } from './leaderboardReducer';


it('Should get update leaderboard with scores', () => {
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

  const nextState = leaderboardReducer(initialState, {type: 'GET_SCORES', scores});
  expect(nextState.scores).toEqual(scores);
});
