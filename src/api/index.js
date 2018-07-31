const rp = require('request-promise');

const leaderboardUrl = `https://enigmatic-atoll-42973.herokuapp.com/api/leaderboards`;

const makeApiRequest = (uri, method, body = {}) => {
  const response = rp({
    uri,
    method,
    body,
    json: true
  });
  
  return response;
};

export const getLeaderboards = async () => {
  try {
    const response = await makeApiRequest(leaderboardUrl, 'GET');
   
    return response;
  } catch(e) {
    throw new Error('Something went wrong getting leaderboards!', e);
  }
};

export const getGamesWonForPlayer = async (name) => {
  try {
    const filter = JSON.stringify({'winner': name.toUpperCase()});
    const encodedUri = `${leaderboardUrl}/count?where=${encodeURIComponent(filter)}`;
    const response = await makeApiRequest(encodedUri, 'GET');

    return response.count;
  } catch(e) {
    throw new Error('Something went wrong counting games won!', e);
  }
};

export const postLeaderboard = async (playerNameX, playerNameO, winner) => {
  try {
    const requestBody = {
      'player_x_name': playerNameX.toUpperCase(),
      'player_o_name': playerNameO.toUpperCase(),
      'winner': winner.toUpperCase()
    };

    const response = await makeApiRequest(leaderboardUrl, 'POST', requestBody);

    return response;
  } catch(e) {
    throw new Error('Something went wrong posting a leaderboard!');
  }
};

