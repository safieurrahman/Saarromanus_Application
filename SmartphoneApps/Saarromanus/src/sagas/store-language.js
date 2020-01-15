import { takeEvery, put, call } from 'redux-saga/effects';

import { STORE_LANGUAGE, changeLanguage } from '../actions/language';
import { showAlert } from '../actions/app-config';
import setStorageLanguage from './services/set-storage-language';

function* storeLanguageSaga({ payload }) {
	try {
		yield call(setStorageLanguage, payload);
		yield put(changeLanguage(payload));
	} catch (err) {
		yield put(
			showAlert({
				title: 'Something Went Wrong!',
				message: 'Sorry, could not store your preference',
			})
		);
		// console.log(err);
	}
}

export function* storeLanguageSagaWatcher() {
	yield takeEvery(STORE_LANGUAGE, storeLanguageSaga);
}
