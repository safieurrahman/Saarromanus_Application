import { all, fork } from 'redux-saga/effects';

import { detectLanguageSagaWatcher } from './detect-language';
import { storeLanguageSagaWatcher } from './store-language';

export default function* rootSaga() {
	yield all([
		fork(detectLanguageSagaWatcher),
		fork(storeLanguageSagaWatcher),
	]);
}
