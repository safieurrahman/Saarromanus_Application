import { takeLatest, put, call } from 'redux-saga/effects';

import {
	INVOKE_TOGGLE_CHECK_UPDATE,
	toggleCheckUpdate,
} from '../actions/app-config';
import setStorageUpdate from './services/set-storage-update';

function* storeUpdateSaga({ payload }) {
	try {
		yield call(setStorageUpdate, payload);
		yield put(toggleCheckUpdate(payload));
	} catch (err) {
		console.log(err);
	}
}

export function* storeUpdateSagaWatcher() {
	yield takeLatest(INVOKE_TOGGLE_CHECK_UPDATE, storeUpdateSaga);
}
