export const initialState = {
  scores: []
};

export const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SCORES':
      const { scores } = action;
      return { scores };
    case 'DELETE_LEADERBOARD': 
      return { ...initialState };
    default:
      return state;
  }
};
