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
