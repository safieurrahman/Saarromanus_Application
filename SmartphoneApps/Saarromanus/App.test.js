import 'react-native';
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import './enzyme-setup';

import App from './App';

describe('<App />', () => {
	const wrapper = shallow(<App />);
	it('demonstrates a fail test', () => {
		expect(wrapper.children.length).toBe(0);
	});
	it('renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('has exaclty 1 children', () => {
		expect(wrapper.children.length).toBe(1);
	});
});
