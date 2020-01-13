import { takeLatest, put, call } from 'redux-saga/effects';

import {
	GET_SIGHT_CATEGORIES,
	populateSightCategories,
} from '../actions/sights';
import getSightCategories from './services/get-sight-categories';
import { showLoadingScreen, hideLoadingScreen } from '../actions/app-config';

function* fetchSightCategoriesSaga() {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getSightCategories);
		// if(response.status) {
		if (response) {
			yield put(populateSightCategories(response));
		}
		yield put(hideLoadingScreen());
	} catch (err) {
		yield put(hideLoadingScreen());
		console.log('connection problem');
	}
}

export function* fetchSightCategoriesSagaWatcher() {
	yield takeLatest(GET_SIGHT_CATEGORIES, fetchSightCategoriesSaga);
}
