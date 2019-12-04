import { all, fork } from 'redux-saga/effects';

import { detectLanguageSagaWatcher } from './detect-language';

export default function* rootSaga() {
	yield all([fork(detectLanguageSagaWatcher)]);
}
