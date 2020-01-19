import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_SIGHT, populateSight } from '../actions/sights';
import getSight from './services/get-sight';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../actions/app-config';

export function* currentSightSaga({ payload }) {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getSight, payload);
		// console.log(response);
		if (response && response.success) {
			if (response.payload && response.payload.id) {
				yield put(populateSight(response.payload));
			} else {
				yield put(
					showAlert({
						title: 'No Data Found',
						message:
							'Could not find the selected sight in the database',
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

export function* currentSightSagaWatcher() {
	yield takeLatest(GET_SIGHT, currentSightSaga);
}
