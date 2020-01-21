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
