import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

import testReducer from '../reducers/test-reducer';

const store = createStore(
	combineReducers({ test: testReducer }),
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
