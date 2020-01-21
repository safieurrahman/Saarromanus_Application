import { runSaga } from 'redux-saga';
import configureStore from 'redux-mock-store';

import { listSightsSaga } from '../list-sights';
import { populateSightsByCategory } from '../../actions/sights';
jest.mock('../services/get-sights');
import getSights from '../services/get-sights';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../../actions/app-config';

const mockedSights = [
	{
		id: '85LOt9BO7RACVo4ShrAK',
		en: {
			name: 'Saarland University',
			information:
				'Saarland University is a modern research university located in Saarbrücken, the capital of the German state of Saarland. It was founded in 1948 in Homburg in co-operation with France and is organized in six faculties that cover all major fields of science.',
		},
		de: {
			information:
				'Die Universität des Saarlandes ist eine moderne Forschungsuniversität mit Sitz in Saarbrücken, der Hauptstadt des Saarlandes. Sie wurde 1948 in Zusammenarbeit mit Frankreich in Homburg gegründet und ist in sechs Fakultäten organisiert, die alle wichtigen Wissenschaftsbereiche abdecken.',
			name: 'Universität des Saarlandes',
		},
		fr: {
			name: 'Université de Sarre',
			information:
				"L'Université de la Sarre est une université de recherche moderne située à Sarrebruck, la capitale du Land de Sarre. Elle a été fondée en 1948 à Homburg en coopération avec la France et est organisée en six facultés qui couvrent tous les principaux domaines scientifiques.",
		},
		thumbnail:
			'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/images%2F1579035923555_Saarland%20Uni.jpg?alt=media&token=7061299b-9bba-4573-b695-340f5813bfe0',
		resourceName: '1579035923555_Saarland Uni.jpg',
		sight_category: '2DEZplgST07PTogH9JWX',
	},
	{
		id: 'Y4JifOOIObOYN0aNzrUh',
		en: {
			name: 'Schwarzenberg Tower',
			information: 'The Schwarzenberg ...\n\n',
		},
		de: {
			name: 'Schwarzenbergturm',
			information:
				'Der Schwarzenbergturm ist ein Aussichtsturm, der zwischen 1930 und 1931 erbaut wurde. Der Stahlbetonturm mit quadratischem Querschnitt befindet sich am Schwarzenberg in Saarbrücken. 2012 wurden erhebliche Baumängel festgestellt und der Turm für rund 250.000 Euro saniert. Es ist seit Oktober 2013 wieder geöffnet und nach der Renovierung der Fassade und der Treppe wieder für die Öffentlichkeit zugänglich.',
		},
		fr: {
			name: 'Tour Schwarzenberg',
			information:
				"La tour Schwarzenberg est une tour de guet construite entre 1930 et 1931. La tour en béton armé de section carrée est située sur le Schwarzenberg à Sarrebruck. Des défauts de construction importants ont été identifiés en 2012 et la tour a été rénovée pour environ 250 000 euros. Il est à nouveau ouvert depuis octobre 2013 et est à nouveau accessible au public après rénovation de la façade et de l'escalier.",
		},
		thumbnail:
			'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/images%2F1579035955622_x1000_y563_9f32be_10.jpg?alt=media&token=a268d17b-f85b-4630-94d4-d0195ada6edb',
		resourceName: '1579035955622_x1000_y563_9f32be_10.jpg',
		sight_category: '2DEZplgST07PTogH9JWX',
	},
];

let mockedResponse;
let fakeStore;

beforeAll(() => {
	mockedResponse = { payload: mockedSights, success: true };
});

describe('list-sights-saga', () => {
	let dispatchedActions;

	beforeAll(async () => {
		getSights.mockImplementation(() => Promise.resolve(mockedResponse));
		fakeStore = configureStore()({});
		await runSaga(fakeStore, listSightsSaga, '2DEZplgST07PTogH9JWX').done;
		dispatchedActions = fakeStore.getActions();
	});

	it('should dispatch the show loading screen event before making any request', () => {
		expect(dispatchedActions[0]).toEqual(showLoadingScreen());
	});

	it('should make a GET request to /sight_categories/2DEZplgST07PTogH9JWX end point', () => {
		expect(getSights.mock.calls.length).toBe(1);
	});

	it('should dispatch the hide loading screen event irrespective of the response', () => {
		expect(dispatchedActions[2]).toEqual(hideLoadingScreen());
	});

	describe('RESPONSE->SUCCESS', () => {
		it('should dispatch a populate sights by category event', () => {
			expect(dispatchedActions[1]).toEqual(
				populateSightsByCategory(mockedSights)
			);
		});
	});

	describe('RESPONSE->ERROR', () => {
		let failedDispatchedActions = [];
		beforeAll(async () => {
			getSights.mockImplementation(() => Promise.reject(''));
			const failedStore = configureStore()({});
			await runSaga(failedStore, listSightsSaga, '2DEZplgST07PTogH9JWX')
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
