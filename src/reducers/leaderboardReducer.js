import {  } from '../api/index';

export const initialState = {
  scores: []
};

export const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SCORES':
      const { scores } = action;
      return { scores };
    default:
      return state;
  }
};
