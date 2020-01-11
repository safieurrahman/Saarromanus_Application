import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import '../../../enzyme-setup';

import IndexScreen from './index';
// import { IndexScreen } from './connector';

const mockStore = configureStore();

const initialState = {
	config: {
		language: 'en-US',
	},
};

let wrapper;
let store;

beforeEach(() => {
	store = mockStore(initialState);
	wrapper = shallow(<IndexScreen store={store} />);
});

describe('<IndexScreen />', () => {
	// const wrapper = shallow(<IndexScreen />);
	// render = wrapper.dive();
	it('renders properly', () => {
		expect(wrapper.dive()).toMatchSnapshot();
	});
});
