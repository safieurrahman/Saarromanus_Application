import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_ROUTE, populateRoute } from '../actions/routes';
import getCurrentRoute from './services/get-current-route';

function* currentRouteSaga({ payload }) {
	try {
		const response = yield call(getCurrentRoute, payload);
		// if(response.status) {
		if (response) {
			yield put(populateRoute(response));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* currentRouteSagaWatcher() {
	yield takeLatest(GET_ROUTE, currentRouteSaga);
}
