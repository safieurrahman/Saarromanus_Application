import { takeEvery, put, call } from 'redux-saga/effects';
import * as Localization from 'expo-localization';

import { DETECT_CHECK_UPDATE, toggleCheckUpdate } from '../actions/app-config';
import getStorageUpdate from './services/get-storage-update';

function* detectUpdateSaga() {
	try {
		const resp = yield call(getStorageUpdate);
		if (resp.success && resp.payload) {
			yield put(toggleCheckUpdate(resp.payload));
		} else {
			yield put(toggleCheckUpdate(false));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* detectUpdateSagaWatcher() {
	yield takeEvery(DETECT_CHECK_UPDATE, detectUpdateSaga);
}
