import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Players from './Players';
import BlankSymbol from './BlankSymbol';
import XSymbol from './XSymbol';
import OSymbol from './OSymbol';
import { X, O } from '../symbols/symbols';
import { addSymbol, startAgain } from '../actions/actions';
import { validatePlayerNames } from '../logic/logic';
import { postLeaderboard as updateResults } from '../api/index';
import { connect } from 'react-redux';
import '../css/Board.css';

class Board extends Component {
  addSymbol (updateFn, rowIndex, position, symbol) {
    !this.props.won && this.props.addSymbol(rowIndex, position, symbol, updateFn);
  }

  getSymbol(rowIndex, position, symbol, updateFn) {
    if (symbol === X) {
      return <XSymbol key={position} position={position} />;
    }
    if (symbol === O) {
      return <OSymbol key={position} position={position} />;
    }
    return <BlankSymbol key={position} addSymbol={this.addSymbol.bind(this, updateFn, rowIndex, position)} turn={this.props.turn} />;
  }

  render() {
    const wonClass   = this.props.won ? ` won-${this.props.wonLine}` : '';
    const drawClass  = this.props.draw ? ' draw' : '';
    const boardClass = 'board' + wonClass + drawClass;
    const hasPlayerNames = validatePlayerNames(this.props.players.X, this.props.players.O).length > 0 ? false : true;

    return (
      <div className="boardContainer">
        { hasPlayerNames &&
          <div className={boardClass}>
            {
              Object.keys(this.props.board)
                .map(rowIndex => {
                  return (
                    <div className={`row row${rowIndex}`} key={rowIndex}>
                      {
                        this.props.board[rowIndex].map((symbol, positon) => {
                          return this.getSymbol(rowIndex, positon, symbol, updateResults);
                        })
                      }
                    </div>
                  );
                })
            }
            {
              this.props.won || this.props.draw ?
              <p className="startAgain" onClick={this.props.startAgain}>
                Click to start again!
              </p> : false
            }
          </div>
        }
        <Players />
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object,
  turn: PropTypes.string,
  won: PropTypes.string,
  draw: PropTypes.bool,
  wonLine: PropTypes.string,
  addSymbol: PropTypes.func,
  startAgain: PropTypes.func,
  players: PropTypes.object
};

export default connect(
  (state) => {
    let { board, turn, won, draw, wonLine, players } = state.gameReducer;
    return { board, turn, won, draw, wonLine, players }
  },
  (dispatch) => {
    return {
      addSymbol (rowIndex, position, symbol, updateFn) {
        dispatch(addSymbol(rowIndex, position, symbol, updateFn));
      },
      startAgain () {
        dispatch(startAgain());
      }
    };
  }
)(Board);

export {Board as PureBoard};
