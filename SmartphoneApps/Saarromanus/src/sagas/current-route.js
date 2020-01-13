import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_ROUTE, populateRoute } from '../actions/routes';
import getCurrentRoute from './services/get-current-route';
import { showLoadingScreen, hideLoadingScreen } from '../actions/app-config';

function* currentRouteSaga({ payload }) {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getCurrentRoute, payload);
		// if(response.status) {
		if (response) {
			yield put(populateRoute(response));
		}
		yield put(hideLoadingScreen());
	} catch (err) {
		yield put(hideLoadingScreen());
		console.log(err);
	}
}

export function* currentRouteSagaWatcher() {
	yield takeLatest(GET_ROUTE, currentRouteSaga);
}
