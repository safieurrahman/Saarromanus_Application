import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_ROUTE_LIST, populateRouteList } from '../actions/routes';
import getRouteList from './services/get-route-list';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../actions/app-config';

export function* listRoutesSaga() {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getRouteList);
		if (response && response.success) {
			if (response.payload && response.payload.length) {
				yield put(populateRouteList(response.payload));
			} else {
				yield put(
					showAlert({
						title: 'No Data Found',
						message: 'Could not find any routes in the database',
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
		// console.log(err);
	}
}

export function* listRoutesSagaWatcher() {
	yield takeLatest(GET_ROUTE_LIST, listRoutesSaga);
}
