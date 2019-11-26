import { takeLatest, delay, put } from 'redux-saga/effects';

const updateAppScreen = () => {
	return { type: 'AM' };
};

function* testSaga() {
	try {
		yield delay(3000);
		yield put(updateAppScreen());
	} catch (err) {
		console.log(err);
	}
}

export function* testSagaWatcher() {
	yield takeLatest('US', testSaga);
}
