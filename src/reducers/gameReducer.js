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
    X: {
      name: '',
      gamesWon: 0
    },
    O: {
      name: '',
      gamesWon: 0
    }
  }
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      const { playerNameX, playerNameO } = action;
      const gamesWonX = getGamesWonForPlayer(playerNameX);
      const gamesWonO = getGamesWonForPlayer(playerNameO);

      return {
        ...state,
        players: {
          X: {
            name: playerNameX,
            gamesWon: gamesWonX
          },
          O: {
            name: playerNameO,
            gamesWon: gamesWonO
          }
        }
      }
    case 'ADD_SYMBOL':
      const {symbol, row, position, updateLeaderboard} = action;
      const newState = _.cloneDeep(state);
      newState.board[row][position] = symbol;

      const xResult = resultForSymbol(X, newState.board);
      const oResult = resultForSymbol(O, newState.board);

      const gameState = determineGameState(xResult, oResult, newState.players, updateLeaderboard);
      
      if (!gameState.won) {
        newState.turn = newState.turn === O ? X : O;
      }

      const boardIsFull = [
        ...newState.board[0],
        ...newState.board[1],
        ...newState.board[2]
      ]
        .filter(symbol => symbol !== '')
        .length === 9;

      if (boardIsFull && !newState.won) {
        newState.draw = true;
      }

      return {...newState, ...gameState };
    case 'START_AGAIN':
      return { ...initialState, players: state.players };
    default:
      return state;
  }
};
