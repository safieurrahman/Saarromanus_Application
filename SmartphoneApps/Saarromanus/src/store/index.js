import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

import configReducer from '../reducers/config-reducer';
import routesReducer from '../reducers/routes-reducer';
import routeReducer from '../reducers/route-reducer';
import sightCategoriesReducer from '../reducers/sight-categories-reducer';
import sightsReducer from '../reducers/sights-reducer';
import sightReducer from '../reducers/sight-reducer';
import appUseInstructionReducer from '../reducers/app-use-instruction-reducer';

const store = createStore(
	combineReducers({
		config: configReducer,
		routes: routesReducer,
		route: routeReducer,
		sightCategories: sightCategoriesReducer,
		sights: sightsReducer,
		sight: sightReducer,
		instruction: appUseInstructionReducer,
	}),
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
