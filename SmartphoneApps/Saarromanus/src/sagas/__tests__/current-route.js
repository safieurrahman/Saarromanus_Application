import { runSaga } from 'redux-saga';
import configureStore from 'redux-mock-store';

import { currentRouteSaga } from '../current-route';
import { populateRoute } from '../../actions/routes';
jest.mock('../services/get-current-route');
import getCurrentRoute from '../services/get-current-route';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../../actions/app-config';

const mockedRoute = {
	id: 'VHQol7Dz3FEkOujzHEhi',
	sights: [
		{
			en: {
				name: 'UdS',
				information: 'UdS',
			},
			fr: {
				name: 'UdS',
				information: 'UdS',
			},
			de: {
				name: 'UdS',
				information: 'UdS',
			},
			id: 'jL691v4sJDMt8eq3sDg6',
			thumbnail:
				'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/images%2F1579079373743_Saarland%20Uni.jpg?alt=media&token=32dca814-9c54-44e5-861b-c8bb440090a7',
			resourceName: '1579079373743_Saarland Uni.jpg',
			coordinate: {
				latitude: 49.25725020830364,
				longitude: 7.040768301574644,
			},
		},
		{
			en: {
				information: 'The Schwarzenberg ...\n\n',
				name: 'Schwarzenberg Tower',
			},
			fr: {
				name: 'Tour Schwarzenberg',
				information:
					"La tour Schwarzenberg est une tour de guet construite entre 1930 et 1931. La tour en béton armé de section carrée est située sur le Schwarzenberg à Sarrebruck. Des défauts de construction importants ont été identifiés en 2012 et la tour a été rénovée pour environ 250 000 euros. Il est à nouveau ouvert depuis octobre 2013 et est à nouveau accessible au public après rénovation de la façade et de l'escalier.",
			},
			de: {
				name: 'Schwarzenbergturm',
				information:
					'Der Schwarzenbergturm ist ein Aussichtsturm, der zwischen 1930 und 1931 erbaut wurde. Der Stahlbetonturm mit quadratischem Querschnitt befindet sich am Schwarzenberg in Saarbrücken. 2012 wurden erhebliche Baumängel festgestellt und der Turm für rund 250.000 Euro saniert. Es ist seit Oktober 2013 wieder geöffnet und nach der Renovierung der Fassade und der Treppe wieder für die Öffentlichkeit zugänglich.',
			},
			id: 'Y4JifOOIObOYN0aNzrUh',
			thumbnail:
				'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/images%2F1579035955622_x1000_y563_9f32be_10.jpg?alt=media&token=a268d17b-f85b-4630-94d4-d0195ada6edb',
			resourceName: '1579035955622_x1000_y563_9f32be_10.jpg',
			coordinate: {
				latitude: 49.2533339,
				longitude: 7.0415635000000005,
			},
		},
	],
	fr: {
		name: 'Uds',
		information: 'Uds',
	},
	en: {
		name: 'Uds',
		information: 'Uds',
	},
	de: {
		name: 'Uds',
		information: 'Uds',
	},
	routePath: [
		{
			latitude: 49.2550333908854,
			longitude: 7.040948867797852,
		},
		{
			latitude: 49.24736639760812,
			longitude: 7.041757315435802,
		},
	],
	googleMapLink: 'https://maps.google.com',
};

let mockedResponse;
let fakeStore;

beforeAll(() => {
	mockedResponse = { payload: mockedRoute, success: true };
});

describe('current-route-saga', () => {
	let dispatchedActions;

	beforeAll(async () => {
		getCurrentRoute.mockImplementation(() =>
			Promise.resolve(mockedResponse)
		);
		fakeStore = configureStore()({});
		await runSaga(fakeStore, currentRouteSaga, 'VHQol7Dz3FEkOujzHEhi').done;
		dispatchedActions = fakeStore.getActions();
	});

	it('should dispatch the show loading screen event before making any request', () => {
		expect(dispatchedActions[0]).toEqual(showLoadingScreen());
	});

	it('should make a GET request to /routes/VHQol7Dz3FEkOujzHEhi end point', () => {
		expect(getCurrentRoute.mock.calls.length).toBe(1);
	});

	it('should dispatch the hide loading screen event irrespective of the response', () => {
		expect(dispatchedActions[2]).toEqual(hideLoadingScreen());
	});

	describe('SUCCESS', () => {
		it('should dispatch a populate route event', () => {
			expect(dispatchedActions[1]).toEqual(populateRoute(mockedRoute));
		});
	});

	describe('ERROR', () => {
		let failedDispatchedActions = [];
		beforeAll(async () => {
			getCurrentRoute.mockImplementation(() => Promise.reject(''));
			const failedStore = configureStore()({});
			await runSaga(failedStore, currentRouteSaga, 'VHQol7Dz3FEkOujzHEhi')
				.done;
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
