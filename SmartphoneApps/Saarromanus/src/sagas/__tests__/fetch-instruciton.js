import { runSaga } from 'redux-saga';
import configureStore from 'redux-mock-store';

import { appUseInstructionSaga } from '../fetch-app-use-instruction';
jest.mock('../services/get-app-use-instruction');
import getInstruction from '../services/get-app-use-instruction';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
	populateAppUseInstruction,
} from '../../actions/app-config';

const mockedInstruction = { en: { content: 'Content' } };

let mockedResponse;
let fakeStore;

beforeAll(() => {
	mockedResponse = { payload: mockedInstruction, success: true };
});

describe('fetch-app-use-instruction-saga', () => {
	let dispatchedActions;

	beforeAll(async () => {
		getInstruction.mockImplementation(() =>
			Promise.resolve(mockedResponse)
		);
		fakeStore = configureStore()({});
		await runSaga(fakeStore, appUseInstructionSaga).done;
		dispatchedActions = fakeStore.getActions();
	});

	it('should dispatch the show loading screen event before making any request', () => {
		expect(dispatchedActions[0]).toEqual(showLoadingScreen());
	});

	it('should make a GET request to /instruction_manual end point', () => {
		expect(getInstruction.mock.calls.length).toBe(1);
	});

	it('should dispatch the hide loading screen event irrespective of the response', () => {
		expect(dispatchedActions[2]).toEqual(hideLoadingScreen());
	});

	describe('SUCCESS', () => {
		it('should dispatch a populate instruction event', () => {
			expect(dispatchedActions[1]).toEqual(
				populateAppUseInstruction(mockedInstruction)
			);
		});
	});

	describe('ERROR', () => {
		let failedDispatchedActions = [];
		beforeAll(async () => {
			getInstruction.mockImplementation(() => Promise.reject(''));
			const failedStore = configureStore()({});
			await runSaga(failedStore, appUseInstructionSaga).done;
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
