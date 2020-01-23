import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SettingsScreen from './index';
import SelectLanguage from '../../components/select-language';
import ToggleBox from '../../components/toggle-box';

const mockStore = configureStore();

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

describe('<SettingsScreen />', () => {
	it('should render properly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount a root level <View /> component', () => {
		expect(component.find(`[data-test-id='mainContainer']`).length).toBe(1);
	});

	it('should render a <SelectLanguage /> component', () => {
		expect(component.find(SelectLanguage).length).toBe(1);
	});

	it('should render a <ToggleBox /> component', () => {
		expect(component.find(ToggleBox).length).toBe(1);
	});

	it('should render a <Button /> component', () => {
		expect(component.find('Button').length).toBe(1);
	});

	describe('Root <View /> component', () => {
		it('should have three child nodes', () => {
			expect(
				component.find(`[data-test-id='mainContainer']`).children()
					.length
			).toBe(3);
		});
	});
});
