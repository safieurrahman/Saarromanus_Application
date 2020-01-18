import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import IndexScreen from './index';

const mockStore = configureStore();

const mockFn = jest.fn();
const navigation = {
	navigate: mockFn,
};

const initialState = {
	config: {
		language: 'en-US',
	},
};

let wrapper;
let store;
let component;

beforeEach(() => {
	store = mockStore(initialState);
	wrapper = shallow(
		<IndexScreen store={store} navigation={navigation} />
	).dive();
	component = wrapper.dive();
});

describe('<IndexScreen />', () => {
	it('renders properly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('has en-US as its current language prop', () => {
		expect(wrapper.props().language).toBe(initialState.config.language);
	});

	it('has 2 main components', () => {
		expect(component.children().length).toBe(2);
	});

	describe('Cover Photo', () => {
		let coverPhoto;
		beforeEach(() => {
			coverPhoto = component.find(`[data-test-id='coverPhoto']`);
		});

		it('exists', () => {
			expect(coverPhoto.length).toBe(1);
		});

		it('has a logo on top of it', () => {
			expect(coverPhoto.find('Image').length).toBe(1);
		});
	});

	describe('Main menu', () => {
		let mainOptionsContainer;
		beforeEach(() => {
			mainOptionsContainer = component.find(
				`[data-test-id='mainOptionsContainer']`
			);
		});

		it('exists', () => {
			expect(mainOptionsContainer.length).toBe(1);
		});

		it('has 3 main options', () => {
			expect(mainOptionsContainer.children().length).toBe(3);
		});

		it('has a Routes button', () => {
			expect(
				mainOptionsContainer.find(`[data-test-id='routesButton']`)
					.length
			).toBe(1);
		});

		it('has a Sights button', () => {
			expect(
				mainOptionsContainer.find(`[data-test-id='sightsButton']`)
					.length
			).toBe(1);
		});

		it('has a Game button', () => {
			expect(
				mainOptionsContainer.find(`[data-test-id='gameButton']`).length
			).toBe(1);
		});

		describe('Buttons', () => {
			it('should invoke navigate functions when they are pressed', () => {
				mainOptionsContainer
					.children()
					.find('TouchableOpacity')
					.forEach(child => {
						child.simulate('press');
					});
				expect(mockFn).toBeCalled();
				expect(mockFn.mock.calls.length).toBe(3);
			});
			describe('Routes Button', () => {
				it('should have text ROUTES in it', () => {
					expect(
						mainOptionsContainer
							.find(`[data-test-id='routesButton']`)
							.find('Text')
							.childAt(0)
							.text()
					).toBe('ROUTES');
				});
			});
			describe('Sights Button', () => {
				it('should have text SIGHTS in it', () => {
					expect(
						mainOptionsContainer
							.find(`[data-test-id='sightsButton']`)
							.find('Text')
							.childAt(0)
							.text()
					).toBe('SIGHTS');
				});
			});
			describe('Game Button', () => {
				it('should have text GAME in it', () => {
					expect(
						mainOptionsContainer
							.find(`[data-test-id='gameButton']`)
							.find('Text')
							.childAt(0)
							.text()
					).toBe('GAME');
				});
			});
		});
	});
});
