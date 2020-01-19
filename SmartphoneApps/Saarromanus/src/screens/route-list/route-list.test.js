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
});
