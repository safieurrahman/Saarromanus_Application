import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_SIGHT, populateSight } from '../actions/sights';
import getSight from './services/get-sight';

function* currentSightSaga({ payload }) {
	try {
		const response = yield call(getSight, payload);
		// if(response.status) {
		if (response) {
			yield put(populateSight(response));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* currentSightSagaWatcher() {
	yield takeLatest(GET_SIGHT, currentSightSaga);
}
