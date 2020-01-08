import { takeLatest, put, call } from 'redux-saga/effects';

import {
	GET_SIGHTS_BY_CATEGORY,
	populateSightsByCategory,
} from '../actions/sights';
import getSights from './services/get-sights';

function* listSightsSaga({ payload }) {
	try {
		const response = yield call(getSights, payload);
		// if(response.status) {
		if (response) {
			yield put(populateSightsByCategory(response.sights));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* listSightsSagaWatcher() {
	yield takeLatest(GET_SIGHTS_BY_CATEGORY, listSightsSaga);
}
