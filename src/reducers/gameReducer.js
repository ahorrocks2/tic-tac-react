import { X, O } from '../symbols/symbols';
import { resultForSymbol, determineGameState } from '../logic/logic';
import { getGamesWonForPlayer } from '../api/index';
import * as _ from 'lodash';

export const initialState = {
  board: {
    0: ['', '', ''],
    1: ['', '', ''],
    2: ['', '', '']
  },
  won: undefined,
  wonLine: undefined,
  winner: undefined,
  draw: false,
  turn: O,
  players: {
    X: '',
    O: ''
  }
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      const { playerX, playerO } = action;

      return {
        ...state,
        players: {
          X: playerX,
          O: playerO
        }
      }
    case 'ADD_SYMBOL':
      const {symbol, row, position, updateLeaderboard} = action;
      const newBoard = _.cloneDeep(state);
      const players = newBoard.players;
      newBoard.board[row][position] = symbol;

      const xResult = resultForSymbol(X, newBoard.board);
      const oResult = resultForSymbol(O, newBoard.board);

      const gameState = determineGameState(xResult, oResult, players, updateLeaderboard);
      
      if (!gameState.won) {
        gameState['turn'] = newBoard.turn === O ? X : O;
      }

      const boardIsFull = [
        ...newBoard.board[0],
        ...newBoard.board[1],
        ...newBoard.board[2]
      ]
        .filter(symbol => symbol !== '')
        .length === 9;

      if (boardIsFull && !gameState.won) {
        gameState['draw'] = true;
        updateLeaderboard()(players.X, players.O, 'DRAW');
      }

      return {...newBoard, ...gameState };
    case 'START_AGAIN':
      return { ...initialState, players: state.players };
    default:
      return state;
  }
};
