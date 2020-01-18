import React from 'react';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import App from './App';

describe('App.js', () => {
	// it('demonstrates a fail test', () => {
	// 	expect(wrapper.children.length).toBe(0);
	// });
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
		// console.log(wrapper.debug());
	});

	describe('<SafeAreaView />', () => {
		it('there should be a SafeAreaView component', () => {
			expect(wrapper.find(`SafeAreaView`).length).toBe(1);
		});
		it('<App />, <LoadingScreen /> and <AlertScreen> should be wrapped inside the SafeAreaView', () => {
			expect(wrapper.find(`SafeAreaView`).children().length).toBe(3);
		});
	});

	describe('<App />', () => {
		it('there should be an App component', () => {
			expect(wrapper.find(`[data-test='App']`).length).toBe(1);
		});
	});
	describe('<LoadingScreen />', () => {
		it('there should be a component called LoadingScreen', () => {
			expect(wrapper.find(`[data-test='LoadingScreen']`).length).toBe(1);
		});
	});
	describe('<AlertScreen />', () => {
		it('there should be a component called AlertScreen', () => {
			expect(wrapper.find(`[data-test='AlertScreen']`).length).toBe(1);
		});
	});
});
