import { takeEvery, put, call } from 'redux-saga/effects';
import * as Localization from 'expo-localization';

import {
	DETECT_CHECK_UPDATE,
	toggleCheckUpdate,
	showLoadingScreen,
	hideLoadingScreen,
} from '../actions/app-config';
import getStorageUpdate from './services/get-storage-update';

function* detectUpdateSaga() {
	try {
		yield put(showLoadingScreen());
		const resp = yield call(getStorageUpdate);
		if (resp.success && resp.payload) {
			yield put(toggleCheckUpdate(resp.payload));
		} else {
			yield put(toggleCheckUpdate(false));
		}
		yield put(hideLoadingScreen());
	} catch (err) {
		yield put(hideLoadingScreen());
		console.log(err);
	}
}

export function* detectUpdateSagaWatcher() {
	yield takeEvery(DETECT_CHECK_UPDATE, detectUpdateSaga);
}
