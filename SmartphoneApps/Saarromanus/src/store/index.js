import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

import configReducer from '../reducers/config-reducer';
import DBReducer from '../reducers/db-reducer';

const store = createStore(
	combineReducers({ config: configReducer, DB: DBReducer }),
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
