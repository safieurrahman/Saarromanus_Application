import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_ROUTE_LIST, populateRouteList } from '../actions/routes';
import getRouteList from './services/get-route-list';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../actions/app-config';

function* listRoutesSaga() {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getRouteList);
		// if(response.status) {
		if (response) {
			yield put(populateRouteList(response));
		} else {
			yield put(
				showAlert({
					title: 'No Data Found',
					message: 'Could not find any routes in the database',
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

export function* listRoutesSagaWatcher() {
	yield takeLatest(GET_ROUTE_LIST, listRoutesSaga);
}
