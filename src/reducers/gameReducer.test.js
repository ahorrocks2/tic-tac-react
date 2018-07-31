import { initialState, gameReducer } from './gameReducer';
import { X, O } from '../symbols/symbols';
import { players } from '../components/App.test';

it('Should add a symbol at given position and change turn', () => {
  const state = {
    board: {
      0: ['', '', ''],
      1: ['', '', ''],
      2: ['', '', '']
    },
    won: undefined,
    wonLine: undefined,
    draw: false,
    turn: O,
    players
  };
  const nextState = gameReducer(state, {type: 'ADD_SYMBOL', symbol: O, row: 0, position: 0});
  expect(nextState.board[0]).toEqual([O, '', '']);
  expect(nextState.turn).toEqual(X);
});

it('Should set "won" symbol when a winning line is set', () => {
  const innerApiCallSpy = jest.fn();
  const updateLeaderboardSpy = jest.fn((x, y, z) => innerApiCallSpy);
  
  const state = {
    board: {
      0: [X,  O, ''],
      1: ['', X, ''],
      2: [O, '', '']
    },
    won: undefined,
    wonLine: undefined,
    draw: false,
    turn: X,
    players
  };
  const nextState = gameReducer(state, {type: 'ADD_SYMBOL', symbol: X, row: 2, position: 2, updateLeaderboard: updateLeaderboardSpy});
  expect(nextState.won).toEqual(X);

  expect(updateLeaderboardSpy.call.length).toBe(1);
  expect(innerApiCallSpy.call.length).toBe(1);  
  expect(innerApiCallSpy).toHaveBeenCalledWith('Jane', 'John', 'Jane');
});

it('Should reset the state to initial', () => {
  const state = {
    board: {
      0: [X,  O, ''],
      1: ['', X, ''],
      2: [O, '', '']
    },
    won: undefined,
    wonLine: undefined,
    draw: false,
    turn: X,
    players
  };
  const nextState = gameReducer(state, {type: 'START_AGAIN'});
  expect(nextState).toEqual({...initialState, players: state.players});
});

it('Should add player names to the state', () => {
  const nextState = gameReducer(initialState, { type: 'ADD_PLAYERS', playerNameX: players.X.name, playerNameO: players.O.name });
  
  expect(nextState.players.X.name).toEqual('Jane');
  expect(nextState.players.O.name).toEqual('John');  
});
