import { runSaga } from 'redux-saga';
import configureStore from 'redux-mock-store';

import { currentSightSaga } from '../current-sight';
import { populateSight } from '../../actions/sights';
jest.mock('../services/get-sight');
import getSight from '../services/get-sight';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../../actions/app-config';

const mockedSight = {
	id: '85LOt9BO7RACVo4ShrAK',
	fr: {
		name: 'Université de Sarre',
		information:
			"L'Université de la Sarre est une université de recherche moderne située à Sarrebruck, la capitale du Land de Sarre. Elle a été fondée en 1948 à Homburg en coopération avec la France et est organisée en six facultés qui couvrent tous les principaux domaines scientifiques.",
	},
	en: {
		name: 'Saarland University',
		information:
			'Saarland University is a modern research university located in Saarbrücken, the capital of the German state of Saarland. It was founded in 1948 in Homburg in co-operation with France and is organized in six faculties that cover all major fields of science.',
	},
	de: {
		name: 'Universität des Saarlandes',
		information:
			'Die Universität des Saarlandes ist eine moderne Forschungsuniversität mit Sitz in Saarbrücken, der Hauptstadt des Saarlandes. Sie wurde 1948 in Zusammenarbeit mit Frankreich in Homburg gegründet und ist in sechs Fakultäten organisiert, die alle wichtigen Wissenschaftsbereiche abdecken.',
	},
	coordinate: {
		latitude: 49.2636037,
		longitude: 7.0274844,
	},
	sight_category: {
		id: '2DEZplgST07PTogH9JWX',
		en: {
			name: 'Siedlungen',
		},
		fr: {
			name: 'Règlements',
		},
		de: {
			name: 'Settlements',
		},
	},
	resources: [
		{
			url:
				'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/images%2F1579035923555_Saarland%20Uni.jpg?alt=media&token=7061299b-9bba-4573-b695-340f5813bfe0',
			title: '1579035923555_Saarland Uni.jpg',
			type: 'image/jpg',
		},
		{
			url:
				'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/images%2F1579035924453_uds_luftbild_3-2.jpg?alt=media&token=48888961-250f-45e5-a06e-07313b514b4c',
			title: '1579035924453_uds_luftbild_3-2.jpg',
			type: 'image/jpg',
		},
		{
			url:
				'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/audio%2F1579063827510_The%20Chainsmokers%20-%20All%20We%20Know%20ft.%20Phoebe%20Ryan.mp3?alt=media&token=ce917aa8-7ed3-41fe-9174-fa1ed4753713',
			title:
				'1579063827510_The Chainsmokers - All We Know ft. Phoebe Ryan.mp3',
			type: 'audio/mpeg',
		},
		{
			url:
				'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/audio%2F1579064650136_Break%20The%20Silence%20%20%20The%20Dig%20%20%20Midnight%20Flowers.mp3?alt=media&token=dd6cbf67-49d1-4b57-9d4b-099350e0e161',
			title:
				'1579064650136_Break The Silence   The Dig   Midnight Flowers.mp3',
			type: 'audio/mpeg',
		},
		{
			url:
				'https://firebasestorage.googleapis.com/v0/b/saarromanus-519b6.appspot.com/o/audio%2F1579064656787_Apparat%20-%20Goodbye%20(feat.%20Soap%26Skin).mp3?alt=media&token=92e6a71d-a76e-4e48-94d6-70fc61c14d23',
			title: '1579064656787_Apparat - Goodbye (feat. Soap&Skin).mp3',
			type: 'audio/mpeg',
		},
	],
};

let mockedResponse;
let fakeStore;

beforeAll(() => {
	mockedResponse = { payload: mockedSight, success: true };
});

describe('current-route-saga', () => {
	let dispatchedActions;

	beforeAll(async () => {
		getSight.mockImplementation(() => Promise.resolve(mockedResponse));
		fakeStore = configureStore()({});
		await runSaga(fakeStore, currentSightSaga, '85LOt9BO7RACVo4ShrAK').done;
		dispatchedActions = fakeStore.getActions();
	});

	it('should dispatch the show loading screen event before making any request', () => {
		expect(dispatchedActions[0]).toEqual(showLoadingScreen());
	});

	it('should make a GET request to /sights/85LOt9BO7RACVo4ShrAK end point', () => {
		expect(getSight.mock.calls.length).toBe(1);
	});

	it('should dispatch the hide loading screen event irrespective of the response', () => {
		expect(dispatchedActions[2]).toEqual(hideLoadingScreen());
	});

	describe('SUCCESS', () => {
		it('should dispatch a populate sight event', () => {
			expect(dispatchedActions[1]).toEqual(populateSight(mockedSight));
		});
	});

	describe('ERROR', () => {
		let failedDispatchedActions = [];
		beforeAll(async () => {
			getSight.mockImplementation(() => Promise.reject(''));
			const failedStore = configureStore()({});
			await runSaga(failedStore, currentSightSaga, '85LOt9BO7RACVo4ShrAK')
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
