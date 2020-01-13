import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_ROUTE_LIST, populateRouteList } from '../actions/routes';
import getRouteList from './services/get-route-list';
import { showLoadingScreen, hideLoadingScreen } from '../actions/app-config';

function* listRoutesSaga() {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getRouteList);
		// if(response.status) {
		if (response) {
			yield put(populateRouteList(response));
		}
		yield put(hideLoadingScreen());
	} catch (err) {
		yield put(hideLoadingScreen());
		console.log(err);
	}
}

export function* listRoutesSagaWatcher() {
	yield takeLatest(GET_ROUTE_LIST, listRoutesSaga);
}
