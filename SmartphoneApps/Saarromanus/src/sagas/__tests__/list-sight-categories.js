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

let mockedResponse;
let fakeStore;

beforeAll(() => {
	mockedResponse = { payload: mockedSightCategories, success: true };
});

describe('list-sights-categories-saga', () => {
	let dispatchedActions;

	beforeAll(async () => {
		getSightCategories.mockImplementation(() =>
			Promise.resolve(mockedResponse)
		);
		fakeStore = configureStore()({});
		await runSaga(fakeStore, fetchSightCategoriesSaga).done;
		dispatchedActions = fakeStore.getActions();
	});

	it('should dispatch the show loading screen event before making any request', () => {
		expect(dispatchedActions[0]).toEqual(showLoadingScreen());
	});

	it('should make a GET request to /sight_categories end point', () => {
		expect(getSightCategories.mock.calls.length).toBe(1);
	});

	it('should dispatch the hide loading screen event irrespective of the response', () => {
		expect(dispatchedActions[2]).toEqual(hideLoadingScreen());
	});

	describe('SUCCESS', () => {
		it('should dispatch a populate sight_categories event', () => {
			expect(dispatchedActions[1]).toEqual(
				populateSightCategories(mockedSightCategories)
			);
		});
	});

	describe('ERROR', () => {
		let failedDispatchedActions = [];
		beforeAll(async () => {
			getSightCategories.mockImplementation(() => Promise.reject(''));
			const failedStore = configureStore()({});
			await runSaga(failedStore, fetchSightCategoriesSaga).done;
			failedDispatchedActions = failedStore.getActions();
		});
		it('should show network request failed related alert', () => {
			expect(failedDispatchedActions[2]).toEqual(
				showAlert({
					title: 'Network Request Failed!',
					message:
						'Unable to load data from the server. Please connect to the internet and try again if you are not connected already.',
				})
			);
		});
	});
});
