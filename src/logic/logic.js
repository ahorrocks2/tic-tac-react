import { X, O } from '../symbols/symbols';

export const determineGameState = (xResult, oResult, players, updateLeaderboard) => {
  let game = {
    won: undefined,
    wonLine: undefined,
    winner: undefined
  };

  if (xResult.won) {
    game.won = X;
    game.wonLine = xResult.line;
    game.winner = players.X;
  }

  if (oResult.won) {
    game.won = O;
    game.wonLine = oResult.line;
    game.winner = players.O;
  }
  
  if (game.won) {
    updateLeaderboard()(players.X, players.O, game.winner);
  }

  return game;
}

export const calculatePlayerStats = leaderboards => {
  const playerNames = getUniquePlayerNames(leaderboards);

  return playerNames.map(name => {
    const games = leaderboards.filter(lb => lb.player_o_name === name || lb.player_x_name === name);
    const gameCounts = countPlayerLossesAndDraws(games, name);
    const { wins, losses, draws } = gameCounts;
  
    return {
      name,
      wins,
      losses,
      draws
    }
  });
};

export const getUniquePlayerNames = leaderboards => {
  const playerXNames = [...new Set(leaderboards.map(lb => lb.player_x_name))];
  const playerONames = [...new Set(leaderboards.map(lb => lb.player_o_name))];

  return [...new Set([...playerXNames, ...playerONames])];
}

const countPlayerLossesAndDraws = (games, name) => {
  const wins = games.filter(g => g.winner === name).length;
  const draws = games.filter(g => g.winner === 'DRAW').length;
  const losses = games.filter(g => g.winner !== name && g.winner !== 'DRAW').length;

  return { wins, losses, draws }
}

export const validatePlayerNames = (playerX, playerO) => {
  let errors = [];

  if (playerX === "") {
    errors.push("Player X must have a name.");
  }

  if (playerO === "") {
    errors.push("Player O must have a name.");
  }

  return errors;
};

const countInRow = (symbol, row) => row.filter(el => el === symbol).length;
const hasWonInRow = (symbol, row) => countInRow(symbol, row) === 3;
export const hasThreatInRow = (symbol, row) => countInRow(symbol, row) === 2;

const countInColumn = (symbol, colNumber, ...rows) => rows.map(row => row[colNumber]).filter(el => el === symbol).length;
const hasWonInColumn = (symbol, colNumber, ...rows) => countInColumn(symbol, colNumber, ...rows) === 3;
export const hasThreatInColumn = (symbol, colNumber, ...rows) => countInColumn(symbol, colNumber, ...rows) === 2;

const countInLeftSlant = (symbol, ...rows) => {
  const [row0, row1, row2] = rows;
  return [row0[0], row1[1], row2[2]].filter(el => el === symbol).length;
};
const hasWonInLeftSlant = (symbol, ...rows) => countInLeftSlant(symbol, ...rows) === 3;
export const hasThreatInLeftSlant = (symbol, ...rows) => countInLeftSlant(symbol, ...rows) === 2;

const countInRightSlant = (symbol, ...rows) => {
  const [row0, row1, row2] = rows;
  return [row0[2], row1[1], row2[0]].filter(el => el === symbol).length;
};
const hasWonInRightSlant = (symbol, ...rows) => countInRightSlant(symbol, ...rows) === 3;
export const hasThreatInRightSlant = (symbol, ...rows) => countInRightSlant(symbol, ...rows) === 2;

export const resultForSymbol = (symbol, board) => {
  const rows = Object.keys(board).map(row => board[row]);
  return [
    {line: 'row0', won: hasWonInRow(symbol, board[0])},
    {line: 'row1', won: hasWonInRow(symbol, board[1])},
    {line: 'row2', won: hasWonInRow(symbol, board[2])},
    {line: 'column0', won: hasWonInColumn(symbol, 0, ...rows)},
    {line: 'column1', won: hasWonInColumn(symbol, 1, ...rows)},
    {line: 'column2', won: hasWonInColumn(symbol, 2, ...rows)},
    {line: 'leftSlant', won: hasWonInLeftSlant(symbol, ...rows)},
    {line: 'rightSlant', won: hasWonInRightSlant(symbol, ...rows)}
  ]
  .reduce((answer, nextCheck) => {
    return nextCheck.won ? nextCheck : answer;
  }, {won: false});
};
