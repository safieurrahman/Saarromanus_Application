import { takeLatest, put, call } from 'redux-saga/effects';

import {
	GET_APP_USE_INSTRUCTION,
	populateAppUseInstruction,
} from '../actions/app-config';
import getAppUseInstruction from './services/get-app-use-instruction';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../actions/app-config';

export function* appUseInstructionSaga() {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getAppUseInstruction);
		if (response && response.success) {
			if (response.payload && response.payload.en) {
				yield put(populateAppUseInstruction(response.payload));
			} else {
				yield put(
					showAlert({
						title: 'No Data Found',
						message: 'There is no instruction in the database!!!',
					})
				);
			}
		} else {
			yield put(
				showAlert({
					title: 'Somethings Is Wrong!',
					message:
						"It's either you or us. If it is our fault, we are probably fixing it right now.",
				})
			);
		}
		yield put(hideLoadingScreen());
	} catch (err) {
		yield put(hideLoadingScreen());
		yield put(
			showAlert({
				title: 'Network Request Failed!',
				message:
					'Unable to load data from the server. Please connect to the internet and try again if you are not connected already.',
			})
		);
		// console.log(err);
	}
}

export function* appUseInstructionSagaWatcher() {
	yield takeLatest(GET_APP_USE_INSTRUCTION, appUseInstructionSaga);
}
