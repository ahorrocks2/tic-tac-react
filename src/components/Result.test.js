import React from 'react';
import { shallow } from 'enzyme';
import { PureResult as Result } from './Result';
import { players } from './App.test';

it('Should render the Result component with message about current turn', () => {
  const wrapper = shallow(<Result turn={'o'} draw={false} players={players} />);
  expect(wrapper.find('p').node.props.children).toEqual(`It\'s ${players.O}\'s turn.`);
});

it('Should render the Result component with message about winning symbol', () => {
  const wrapper = shallow(<Result won={'x'} draw={false} turn={'x'} players={players} />);
  expect(wrapper.find('p').node.props.children).toEqual(`Yay! ${players.X} won!`);
});

it('Should render the Result component with message about the draw', () => {
  const wrapper = shallow(<Result draw={true} turn={'x'} players={players} />);
  expect(wrapper.find('p').node.props.children).toEqual('We have a draw!');
});

it('Should render the Result component with message about needing player names to begin', () => {
  const noPlayerNames = {
    X: '', 
    O: ''
  }
  const wrapper = shallow(<Result draw={true} turn={'x'} players={noPlayerNames} />);
  expect(wrapper.find('p').node.props.children).toEqual(`Please enter player names to begin.`);
});
