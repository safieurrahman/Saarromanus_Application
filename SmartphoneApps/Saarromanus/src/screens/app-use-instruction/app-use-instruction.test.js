import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import AppUseInstructionScreen from './index';

const mockStore = configureStore();

const initialState = {};

let wrapper;
let store;
let component;

beforeAll(() => {
	store = mockStore(initialState);
	wrapper = shallow(<AppUseInstructionScreen store={store} />).dive();
	component = wrapper.dive();
});

describe('<AppUseInstructionScreen />', () => {
	it('should render properly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount a root level <ScrollView /> component', () => {
		expect(component.find(`[data-test-id='mainContainer']`).length).toBe(1);
	});

	describe('Without Data', () => {
		it('should not render any <View /> as there is not data', () => {
			expect(component.find('View').length).toBe(0);
		});
	});
});
