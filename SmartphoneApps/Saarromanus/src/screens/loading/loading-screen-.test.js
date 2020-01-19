import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import LoadingScreen from './index';

const mockStore = configureStore();

const mockFn = jest.fn();

const initialLoadingState = {
	config: { loading: true },
};

const initialNonLoadingState = {
	config: { loading: false },
};

describe('<LoadingScreen />', () => {
	describe('If Not Loading', () => {
		let wrapper;
		let store;

		beforeAll(() => {
			store = mockStore(initialNonLoadingState);
			wrapper = shallow(<LoadingScreen store={store} />).dive();
		});

		it('should not render', () => {
			expect(wrapper).toMatchSnapshot('loading:false');
			expect(wrapper.dive().children().length).toBeFalsy();
		});

		it('should not mount any <View /> component', () => {
			expect(wrapper.find('View').length).toBe(0);
		});
	});
	describe('When Loading', () => {
		let wrapper;
		let store;
		let component;

		beforeAll(() => {
			store = mockStore(initialLoadingState);
			wrapper = shallow(<LoadingScreen store={store} />).dive();
			component = wrapper.dive();
		});

		it('should render properly', () => {
			expect(wrapper).toMatchSnapshot('loading:true');
		});

		it('should mount <View /> component', () => {
			expect(component.find('View').length).toBe(1);
		});

		it('should render two <Image /> components', () => {
			expect(component.find('Image').length).toBe(2);
		});

		it('should render a <ActivityIndicator /> component', () => {
			expect(component.find('ActivityIndicator').length).toBe(1);
		});

		it('should have three inner components', () => {
			expect(component.find('View').children().length).toBe(3);
		});
	});
});
