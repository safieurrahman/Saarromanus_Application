import { takeLatest, put, call } from 'redux-saga/effects';

import {
	GET_SIGHTS_BY_CATEGORY,
	populateSightsByCategory,
} from '../actions/sights';
import getSights from './services/get-sights';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../actions/app-config';

export function* listSightsSaga({ payload }) {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getSights, payload);
		if (response && response.success) {
			if (response.payload && response.payload.length) {
				yield put(populateSightsByCategory(response.payload));
			} else {
				yield put(
					showAlert({
						title: 'No Data Found!',
						message:
							'Could not find any sights for this category in the database',
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
		// console.log('error form here', err);
	}
}

export function* listSightsSagaWatcher() {
	yield takeLatest(GET_SIGHTS_BY_CATEGORY, listSightsSaga);
}
