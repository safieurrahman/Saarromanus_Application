import { takeLatest, put, call } from 'redux-saga/effects';

import {
	GET_SIGHTS_BY_CATEGORY,
	populateSightsByCategory,
} from '../actions/sights';
import getSights from './services/get-sights';
import { showLoadingScreen, hideLoadingScreen } from '../actions/app-config';

function* listSightsSaga({ payload }) {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getSights, payload);
		// if(response.status) {
		if (response) {
			yield put(populateSightsByCategory(response.sights));
		}
		yield put(hideLoadingScreen());
	} catch (err) {
		yield put(hideLoadingScreen());
		console.log(err);
	}
}

export function* listSightsSagaWatcher() {
	yield takeLatest(GET_SIGHTS_BY_CATEGORY, listSightsSaga);
}
