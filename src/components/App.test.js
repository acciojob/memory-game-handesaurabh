import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

describe('Memory Game Tests', () => {
  it('should render the landing page with difficulty options', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.levels_container')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('Welcome!');
    expect(wrapper.find('#easy')).toHaveLength(1);
    expect(wrapper.find('#normal')).toHaveLength(1);
    expect(wrapper.find('#hard')).toHaveLength(1);
    expect(wrapper.find('#start-game-btn')).toHaveLength(1);
  });

  it('should start the game when a difficulty level is selected', () => {
    const wrapper = shallow(<App />);
    wrapper.find('#easy').simulate('change');
    expect(wrapper.find('.cells_container')).toHaveLength(1);
    expect(wrapper.find('.game-info')).toHaveLength(1);
    expect(wrapper.find('.game-info').find('h2').text()).toContain('Easy Mode');
  });

  it('should start the game when Start Game button is clicked', () => {
    const wrapper = shallow(<App />);
    wrapper.find('#start-game-btn').simulate('click');
    expect(wrapper.find('.cells_container')).toHaveLength(1);
    expect(wrapper.find('.game-info')).toHaveLength(1);
    expect(wrapper.find('.game-info').find('h2').text()).toContain('Easy Mode');
  });

  it('should display the correct number of tiles for easy mode', () => {
    const wrapper = shallow(<App />);
    wrapper.find('#easy').simulate('change');
    // 8 tiles for easy mode
    expect(wrapper.find('.tile')).toHaveLength(8);
  });

  it('should display the correct number of tiles for normal mode', () => {
    const wrapper = shallow(<App />);
    wrapper.find('#normal').simulate('change');
    // 16 tiles for normal mode
    expect(wrapper.find('.tile')).toHaveLength(16);
  });

  it('should display the correct number of tiles for hard mode', () => {
    const wrapper = shallow(<App />);
    wrapper.find('#hard').simulate('change');
    // 32 tiles for hard mode
    expect(wrapper.find('.tile')).toHaveLength(32);
  });

  it('should reset the game when Reset Game button is clicked', () => {
    const wrapper = shallow(<App />);
    wrapper.find('#easy').simulate('change');
    // Game should be running now
    expect(wrapper.find('.cells_container')).toHaveLength(1);
    // Click reset button
    wrapper.find('.game-info').find('button').simulate('click');
    // Should be back to landing page
    expect(wrapper.find('.levels_container')).toHaveLength(1);
  });
});