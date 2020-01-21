import { runSaga } from 'redux-saga';
import configureStore from 'redux-mock-store';

import { fetchSightCategoriesSaga } from '../fetch-sight-categories';
import { populateSightCategories } from '../../actions/sights';
jest.mock('../services/get-sight-categories');
import getSightCategories from '../services/get-sight-categories';

import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../../actions/app-config';

const mockedSightCategories = [
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
];
