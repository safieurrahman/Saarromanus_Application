import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_ROUTE, populateRoute } from '../actions/routes';
import getCurrentRoute from './services/get-current-route';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../actions/app-config';

import { NavigationActions } from 'react-navigation';

function* currentRouteSaga({ payload }) {
	try {
		yield put(showLoadingScreen());
		const response = yield call(getCurrentRoute, payload);
		// if(response.status) {
		if (response) {
			yield put(populateRoute(response));
		} else {
			yield put(
				showAlert({
					title: 'No Data Found',
					message:
						'Could not find the selected route in the database',
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

export function* currentRouteSagaWatcher() {
	yield takeLatest(GET_ROUTE, currentRouteSaga);
}
