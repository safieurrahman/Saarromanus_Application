import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_ROUTE_LIST, populateRouteList } from '../actions/routes';
import getRouteList from './services/get-route-list';

function* listRoutesSaga() {
	try {
		const response = yield call(getRouteList);
		// if(response.status) {
		if (response) {
			yield put(populateRouteList(response));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* listRoutesSagaWatcher() {
	yield takeLatest(GET_ROUTE_LIST, listRoutesSaga);
}
