import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlankSymbol from './BlankSymbol';
import XSymbol from './XSymbol';
import OSymbol from './OSymbol';
import { X, O } from '../symbols/symbols';
import { addSymbol, startAgain } from '../actions/actions';
import { validatePlayerNames } from '../logic/logic';
import { connect } from 'react-redux';

class Board extends Component {
  addSymbol (rowIndex, position, symbol) {
    !this.props.won && this.props.addSymbol(rowIndex, position, symbol);
  }

  getSymbol(rowIndex, position, symbol) {
    if (symbol === X) {
      return <XSymbol key={position} position={position} />;
    }
    if (symbol === O) {
      return <OSymbol key={position} position={position} />;
    }
    return <BlankSymbol key={position} addSymbol={this.addSymbol.bind(this, rowIndex, position)} turn={this.props.turn} />;
  }

  render() {
    const wonClass   = this.props.won ? ` won-${this.props.wonLine}` : '';
    const drawClass  = this.props.draw ? ' draw' : '';
    const boardClass = 'board' + wonClass + drawClass;
    const hasPlayerNames = validatePlayerNames(this.props.players.X.name, this.props.players.O.name).length > 0 ? false : true;

    return (
      <div>
        { hasPlayerNames &&
          <div className={boardClass}>
            {
              Object.keys(this.props.board)
                .map(rowIndex => {
                  return (
                    <div className={`row row${rowIndex}`} key={rowIndex}>
                      {
                        this.props.board[rowIndex].map((symbol, positon) => {
                          return this.getSymbol(rowIndex, positon, symbol);
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
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  turn: PropTypes.string.isRequired,
  won: PropTypes.string,
  draw: PropTypes.bool.isRequired,
  wonLine: PropTypes.string,
  addSymbol: PropTypes.func.isRequired,
  startAgain: PropTypes.func.isRequired,
  players: PropTypes.object.isRequired
};

export default connect(
  ({board, turn, won, draw, wonLine, players}) => ({
    board, turn, won, draw, wonLine, players
  }),
  (dispatch) => {
    return {
      addSymbol (rowIndex, position, symbol) {
        dispatch(addSymbol(rowIndex, position, symbol));
      },
      startAgain () {
        dispatch(startAgain());
      }
    };
  }
)(Board);

export {Board as PureBoard};
