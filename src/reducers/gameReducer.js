import { X, O } from '../symbols/symbols';
import { resultForSymbol } from '../logic/logic';
import { getGamesWonForPlayer, postLeaderboard } from '../api/index';
import * as _ from 'lodash';

export const initialState = {
  board: {
    0: ['', '', ''],
    1: ['', '', ''],
    2: ['', '', '']
  },
  won: undefined,
  wonLine: undefined,
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

export const gameReducer = (state, action) => {
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
      const {symbol, row, position} = action;
      const newState = _.cloneDeep(state);
      newState.board[row][position] = symbol;

      const xResult = resultForSymbol(X, newState.board);
      const oResult = resultForSymbol(O, newState.board);
      let winner; 

      if (xResult.won) {
        newState.won = X;
        newState.wonLine = xResult.line;
        winner = state.players.X.name;
      }

      if (oResult.won) {
        newState.won = O;
        newState.wonLine = oResult.line;
        winner = state.players.O.name;
      }

      if (!newState.won) {
        newState.turn = newState.turn === O ? X : O;
      } else {
        postLeaderboard(state.players.X.name, state.players.O.name, winner); 
        
        const newScore = getGamesWonForPlayer(winner);
        newState.players[newState.won.toUpperCase()].gamesWon = newScore;
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

      return newState;
    case 'START_AGAIN':
      return { ...initialState, players: state.players };
    default:
      return state;
  }
};
