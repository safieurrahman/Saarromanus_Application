import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_SIGHT, populateSight } from '../actions/sights';
import getSight from './services/get-sight';
import { showLoadingScreen, hideLoadingScreen } from '../actions/app-config';

function* currentSightSaga({ payload }) {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getSight, payload);
		// if(response.status) {
		if (response) {
			yield put(populateSight(response));
		}
		yield put(hideLoadingScreen());
	} catch (err) {
		yield put(hideLoadingScreen());
		console.log(err);
	}
}

export function* currentSightSagaWatcher() {
	yield takeLatest(GET_SIGHT, currentSightSaga);
}
