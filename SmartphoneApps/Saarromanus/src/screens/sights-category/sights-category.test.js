import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SightsCategoryScreen from './index';

const mockStore = configureStore();

const mockFn = jest.fn();
const navigation = {
	navigate: mockFn,
};

const initialState = {
	config: { checkForUpdate: false },
	sightCategories: [
		{
			id: 'all',
			en: {
				name: 'All',
			},
			de: {
				name: 'Alle',
			},
			fr: {
				name: 'Toutes',
			},
		},
		{
			id: '2DEZplgST07PTogH9JWX',
			en: {
				name: 'Siedlungen',
			},
			de: {
				name: 'Settlements',
			},
			fr: {
				name: 'Règlements',
			},
		},
		{
			id: 'JbyYyCCSm9ZT2yKGhjTC',
			en: {
				name: 'Roman Villas',
			},
			de: {
				name: 'Römische Villen',
			},
			fr: {
				name: 'Villas romaines',
			},
		},
		{
			id: 'qXG2ZqlHWLQiDLYea1qn',
			en: {
				name: 'Sanctuaries',
			},
			de: {
				name: 'Heiligtümer',
			},
			fr: {
				name: 'Sanctuaires',
			},
		},
	],
};

let wrapper;
let store;
let component;

beforeAll(() => {
	store = mockStore(initialState);
	wrapper = shallow(
		<SightsCategoryScreen store={store} navigation={navigation} />
	).dive();
	component = wrapper.dive();
});

describe('<SightsCategoryScreen />', () => {
	it('renders properly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('has one main <View /> component', () => {
		expect(component.find('View').length).toBe(1);
	});

	describe('Category List', () => {
		it('should be an array of categories', () => {
			expect(Array.isArray(wrapper.props().sightCategories)).toBe(true);
		});
		it('length should be equal to the number of sights categories received from the store', () => {
			expect(wrapper.props().sightCategories.length).toBe(
				initialState.sightCategories.length
			);
		});
		describe('Single Category', () => {
			it('should contain the component: <SingleCategory />', () => {
				expect(
					component.find('withNavigation(SingleCategory)').length
				).not.toBe(0);
			});
			it('length should equal to the number of categories', () => {
				expect(
					component.find('withNavigation(SingleCategory)').length
				).toBe(initialState.sightCategories.length);
			});
		});
	});
});
