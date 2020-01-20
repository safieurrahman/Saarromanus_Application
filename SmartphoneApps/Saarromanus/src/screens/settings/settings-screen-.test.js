import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SettingsScreen from './index';

const mockStore = configureStore();

const mockFn = jest.fn();

const initialState = {
	config: { language: 'en-US', checkForUpdate: false },
};

let wrapper;
let store;
let component;
beforeAll(() => {
	store = mockStore(initialState);
	wrapper = shallow(<SettingsScreen store={store} />).dive();
	component = wrapper.dive();
});
