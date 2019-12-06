import { takeEvery, put, call } from 'redux-saga/effects';

import { STORE_LANGUAGE, changeLanguage } from '../actions/language';
import setStorageLanguage from './services/set-storage-language';

function* storeLanguageSaga({ payload }) {
	try {
		yield call(setStorageLanguage, payload);
		yield put(changeLanguage(payload));
	} catch (err) {
		console.log(err);
	}
}

export function* storeLanguageSagaWatcher() {
	yield takeEvery(STORE_LANGUAGE, storeLanguageSaga);
}
