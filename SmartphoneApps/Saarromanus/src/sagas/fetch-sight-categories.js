import { takeLatest, put, call } from 'redux-saga/effects';

import {
	GET_SIGHT_CATEGORIES,
	populateSightCategories,
} from '../actions/sights';
import getSightCategories from './services/get-sight-categories';

function* fetchSightCategoriesSaga() {
	try {
		const response = yield call(getSightCategories);
		// if(response.status) {
		if (response) {
			yield put(populateSightCategories(response));
		}
	} catch (err) {
		console.log('connection problem');
	}
}

export function* fetchSightCategoriesSagaWatcher() {
	yield takeLatest(GET_SIGHT_CATEGORIES, fetchSightCategoriesSaga);
}
