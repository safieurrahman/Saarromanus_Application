import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SightsListScreen from './index';

const mockStore = configureStore();

const mockFn = jest.fn();
const navigation = {
	navigate: mockFn,
};

const initialState = {
	config: { checkForUpdate: false },
	sights: [
		{
			id: 'AK1AIRDavlLPkNjV1VDt',
			en: {
				name: 'Mithra chapel on Halberg',
				information: 'The worship of the sun...',
			},
			de: {
				name: 'Mithraskapelle am Halberg',
				information: 'Die Anbetung der Sonne ist ein Kult',
			},
			fr: {
				name: 'Chapelle de Mithras à Halberg',
				information: "L'adoration du soleil est un culte",
			},
			thumbnail: 'https://firebasestorage.googleapis.com/v0/b',
			resourceName: 'front_large.jpg',
			sight_category: 'qXG2ZqlHWLQiDLYea1qn',
		},
	],
};

let wrapper;
let store;
let component;

beforeAll(() => {
	store = mockStore(initialState);
	wrapper = shallow(
		<SightsListScreen store={store} navigation={navigation} />
	).dive();
	component = wrapper.dive();
});

describe('<SightsListScreen />', () => {
	it('renders properly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('has one main <ScrollView /> component', () => {
		expect(component.find(`[data-test-id='mainContainer']`).length).toBe(1);
	});

	describe('Sights List', () => {
		it('should be an array of sights', () => {
			expect(Array.isArray(wrapper.props().sights)).toBe(true);
		});
		it('length should be equal to the number of sights passed via the store', () => {
			expect(wrapper.props().sights.length).toBe(
				initialState.sights.length
			);
		});
	});
});
