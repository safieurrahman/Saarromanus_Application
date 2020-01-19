import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import RouteListScreen from './index';

const mockStore = configureStore();

const mockFn = jest.fn();
const navigation = {
	navigate: mockFn,
};

const initialState = {
	config: { checkForUpdate: false },
	routes: [
		{
			id: 'KBaeZFpmqRafsXhcsq3V',
			en: {
				name: 'Dillingen Route',
				information: 'Info..',
			},
			de: {
				name: 'Dillingen Route',
				information: 'Info..',
			},
			fr: {
				name: 'Delingen Route',
				information: 'Info..',
			},
		},
		{
			id: 'lzOL126R7Em8FDO0jlHH',
			en: {
				name: 'Saarland Route',
				information: 'Information',
			},
			de: {
				name: 'Saarland Route',
				information: 'Informationen',
			},
			fr: {
				information: 'Informations',
				name: 'Route de la Sarre',
			},
		},
	],
};

let wrapper;
let store;
let component;

beforeEach(() => {
	store = mockStore(initialState);
	wrapper = shallow(
		<RouteListScreen store={store} navigation={navigation} />
	).dive();
	component = wrapper.dive();
});

describe('<RouteListScreen />', () => {
	it('renders properly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('has one main <View /> component', () => {
		expect(component.find(`[data-test-id='mainComponent']`).length).toBe(1);
	});

	describe('Routes List', () => {
		it('length should not be zero when there are routes', () => {
			expect(component.find(`[data-test-id='listItem']`).length).not.toBe(
				0
			);
		});
		it('length should be equal to the number of routes received from the store', () => {
			expect(component.find(`[data-test-id='listItem']`).length).toBe(
				initialState.routes.length
			);
		});
		describe('Single Route', () => {
			it('should navigate to the Route Details page when pressed/tapped', () => {
				component
					.find(`[data-test-id='listItem']`)
					.find('TouchableOpacity')
					.forEach(node => {
						node.simulate('press');
					});
				expect(mockFn).toBeCalled();
				expect(mockFn.mock.calls.length).toBe(2);
			});
			it('should not fire navigation event if it is not pressed/tapped', () => {
				expect(jest.fn()).not.toBeCalled();
				expect(jest.fn().mock.calls.length).toBe(0);
			});
		});
	});
});
