import { all, fork } from 'redux-saga/effects';

import { detectLanguageSagaWatcher } from './detect-language';
import { storeLanguageSagaWatcher } from './store-language';
import { listRoutesSagaWatcher } from './list-routes';
import { currentRouteSagaWatcher } from './current-route';
import { fetchSightCategoriesSagaWatcher } from './fetch-sight-categories';
import { listSightsSagaWatcher } from './list-sights';
import { currentSightSagaWatcher } from './current-sight';
import { detectUpdateSagaWatcher } from './detect-update';
import { storeUpdateSagaWatcher } from './store-update';
import { appUseInstructionSagaWatcher } from './fetch-app-use-instruction';

export default function* rootSaga() {
	yield all([
		fork(detectLanguageSagaWatcher),
		fork(storeLanguageSagaWatcher),
		fork(listRoutesSagaWatcher),
		fork(currentRouteSagaWatcher),
		fork(fetchSightCategoriesSagaWatcher),
		fork(listSightsSagaWatcher),
		fork(currentSightSagaWatcher),
		fork(detectUpdateSagaWatcher),
		fork(storeUpdateSagaWatcher),
		fork(appUseInstructionSagaWatcher),
	]);
}
