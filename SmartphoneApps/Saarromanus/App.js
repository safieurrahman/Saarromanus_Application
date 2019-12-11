import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';

import IndexScreen from './src/screens/index';
import SettingsScreen from './src/screens/settings';
import SightsCategoryScreen from './src/screens/sights-category';
import SightsListScreen from './src/screens/sights-list';
import SightDetailsScreen from './src/screens/sight-details';

import store from './src/store/';

const navigator = createStackNavigator(
	{
		Index: IndexScreen,
		Settings: SettingsScreen,
		Sights: SightsCategoryScreen,
		SightsList: SightsListScreen,
		SightDetails: SightDetailsScreen,
	},
	{
		initialRouteName: 'Index',
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
