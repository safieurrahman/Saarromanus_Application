import { all, fork } from 'redux-saga/effects';

import { testSagaWatcher } from './test-saga';

export default function* rootSaga() {
	yield all([fork(testSagaWatcher)]);
}
