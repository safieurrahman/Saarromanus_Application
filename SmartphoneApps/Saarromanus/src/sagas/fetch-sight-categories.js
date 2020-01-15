import { takeLatest, put, call } from 'redux-saga/effects';

import {
	GET_SIGHT_CATEGORIES,
	populateSightCategories,
} from '../actions/sights';
import getSightCategories from './services/get-sight-categories';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../actions/app-config';

function* fetchSightCategoriesSaga() {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getSightCategories);
		// if(response.status) {
		if (response) {
			yield put(populateSightCategories(response));
		} else {
			yield put(
				showAlert({
					title: 'No Data Found',
					message:
						'Could not find any sight categories in the database',
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

export function* fetchSightCategoriesSagaWatcher() {
	yield takeLatest(GET_SIGHT_CATEGORIES, fetchSightCategoriesSaga);
}
