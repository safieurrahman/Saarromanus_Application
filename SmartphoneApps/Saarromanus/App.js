import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';

import IndexScreen from './src/screens/index';

import store from './src/store/';

const navigator = createStackNavigator(
	{
		Index: IndexScreen,
	},
	{
		initialRouteName: 'Index',
		defaultNavigationOptions: {
			title: 'Saarromanus',
			headerStyle: {
				backgroundColor: 'rgba(0, 128, 128, 1)',
			},
		},
		headerLayoutPreset: 'center',
	}
);

const App = createAppContainer(navigator);

export default function() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}
