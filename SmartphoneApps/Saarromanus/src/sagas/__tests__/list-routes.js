import { runSaga } from 'redux-saga';
import configureStore from 'redux-mock-store';

import { listRoutesSaga } from '../list-routes';
import { populateRouteList } from '../../actions/routes';
jest.mock('../services/get-route-list');
import getRouteList from '../services/get-route-list';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../../actions/app-config';

const mockedRoutes = [
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
];

let mockedResponse;
let fakeStore;

beforeAll(() => {
	mockedResponse = { payload: mockedRoutes, success: true };
});

describe('list-routes-saga', () => {
	let dispatchedActions;

	beforeAll(async () => {
		getRouteList.mockImplementation(() => Promise.resolve(mockedResponse));
		fakeStore = configureStore()({});
		await runSaga(fakeStore, listRoutesSaga).done;
		dispatchedActions = fakeStore.getActions();
	});

	it('should dispatch the show loading screen event before making any request', () => {
		expect(dispatchedActions[0]).toEqual(showLoadingScreen());
	});

	it('should make a GET request to /routes end point', () => {
		expect(getRouteList.mock.calls.length).toBe(1);
	});

	it('should dispatch the hide loading screen event irrespective of the response', () => {
		expect(dispatchedActions[2]).toEqual(hideLoadingScreen());
	});

	describe('SUCCESS', () => {
		it('should dispatch a populate routes event', () => {
			expect(dispatchedActions[1]).toEqual(
				populateRouteList(mockedRoutes)
			);
		});
	});

	describe('ERROR', () => {
		let failedDispatchedActions = [];
		beforeAll(async () => {
			getRouteList.mockImplementation(() => Promise.reject(''));
			const failedStore = configureStore()({});
			await runSaga(failedStore, listRoutesSaga).done;
			failedDispatchedActions = failedStore.getActions();
		});
		it('should show network request failed related error', () => {
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
