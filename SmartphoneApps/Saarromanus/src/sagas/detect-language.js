import { takeEvery, put, call } from 'redux-saga/effects';
import * as Localization from 'expo-localization';

import { DETECT_LANGUAGE, changeLanguage } from '../actions/language';
import getStoragedLanguage from './services/get-storage-language';

import { showLoadingScreen, hideLoadingScreen } from '../actions/app-config';

function* detectLanguageSaga() {
	try {
		yield put(showLoadingScreen());
		const resp = yield call(getStoragedLanguage);
		if (resp.success && resp.payload) {
			yield put(changeLanguage(resp.payload));
		} else {
			yield put(changeLanguage(Localization.locale));
		}
		yield put(hideLoadingScreen());
	} catch (err) {
		yield hideLoadingScreen();
		yield put(
			showAlert({
				title: 'Something Went Wrong!',
				message: 'Sorry, could not read your language preference',
			})
		);
		// console.log(err);
	}
}

export function* detectLanguageSagaWatcher() {
	yield takeEvery(DETECT_LANGUAGE, detectLanguageSaga);
}
