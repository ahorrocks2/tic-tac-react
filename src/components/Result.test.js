import React from 'react';
import { shallow } from 'enzyme';
import { PureResult as Result } from './Result';

const players = {
  X: {
    name: 'Jane'
  },
  O: {
    name: 'John'
  }
};

it('Should render the Result component with message about current turn', () => {
  const wrapper = shallow(<Result turn={'o'} draw={false} players={players} />);
  expect(wrapper.find('p').node.props.children).toEqual(`It\'s ${players.O.name}\'s turn.`);
});

it('Should render the Result component with message about winning symbol', () => {
  const wrapper = shallow(<Result won={'x'} draw={false} turn={'x'} players={players} />);
  expect(wrapper.find('p').node.props.children).toEqual(`Yay! ${players.X.name} won!`);
});

it('Should render the Result component with message about the draw', () => {
  const wrapper = shallow(<Result draw={true} turn={'x'} players={players} />);
  expect(wrapper.find('p').node.props.children).toEqual('We have a draw!');
});

it('Should render the Result component with message about needing player names to begin', () => {
  const noPlayerNames = {
    X: { name: '' }, 
    O: { name: '' }
  }
  const wrapper = shallow(<Result draw={true} turn={'x'} players={noPlayerNames} />);
  expect(wrapper.find('p').node.props.children).toEqual(`Please enter player names to begin the game.`);
});
