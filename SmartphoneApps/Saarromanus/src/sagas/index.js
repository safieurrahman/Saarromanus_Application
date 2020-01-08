import { all, fork } from 'redux-saga/effects';

import { detectLanguageSagaWatcher } from './detect-language';
import { storeLanguageSagaWatcher } from './store-language';
import { listRouteSagaWatcher } from './list-route';
import { currentRouteSagaWatcher } from './current-route';

export default function* rootSaga() {
	yield all([
		fork(detectLanguageSagaWatcher),
		fork(storeLanguageSagaWatcher),
		fork(listRouteSagaWatcher),
		fork(currentRouteSagaWatcher),
	]);
}
