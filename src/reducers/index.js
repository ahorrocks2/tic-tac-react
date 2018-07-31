import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import { leaderboardReducer } from './leaderboardReducer';

export default combineReducers({
  gameReducer,
  leaderboardReducer
});