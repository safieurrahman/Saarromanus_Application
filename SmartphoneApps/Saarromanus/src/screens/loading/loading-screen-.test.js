import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import LoadingScreen from './index';

const mockStore = configureStore();

const mockFn = jest.fn();

const initialLoadingState = {
	config: { loading: true },
};

const initialNonLoadingState = {
	config: { loading: false },
};
