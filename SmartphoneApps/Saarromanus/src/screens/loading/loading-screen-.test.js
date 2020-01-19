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
		});

		it('should not mount any <View /> component', () => {
			expect(wrapper.find('View').length).toBe(0);
		});
	});
});
