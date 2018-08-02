import { X, O } from '../symbols/symbols';
import { resultForSymbol, determineGameResult } from '../logic/logic';
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
      const gameResult = determineGameResult(newBoard, xResult, oResult, players, updateLeaderboard);
     
      if (gameResult.draw) {   
        updateLeaderboard()(players.X, players.O, 'DRAW');
      }

      if (gameResult.won) {
        updateLeaderboard()(players.X, players.O, gameResult.winner);
      }

      if (!gameResult.won) {
        newBoard.turn = newBoard.turn === O ? X : O;
      }

      return {...newBoard, ...gameResult };
    case 'START_AGAIN':
      return { ...initialState, players: state.players };
    default:
      return state;
  }
};
