import React from 'react';
import { SafeAreaView } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';

import IndexScreen from './src/screens/index';
import SettingsScreen from './src/screens/settings';
import SightsCategoryScreen from './src/screens/sights-category';
import SightsListScreen from './src/screens/sights-list';
import SightDetailsScreen from './src/screens/sight-details';
import RouteViewScreen from './src/screens/route-view';
import RouteListScreen from './src/screens/route-list';
import LoadingScreen from './src/screens/loading';
import AlertScreen from './src/screens/alert';
import AppUseInstructionScreen from './src/screens/app-use-instruction';

import store from './src/store/';

import initOfflineSupport from './src/hooks/use-initialize-offline-support';

const navigator = createStackNavigator(
	{
		Index: IndexScreen,
		Settings: SettingsScreen,
		Sights: SightsCategoryScreen,
		SightsList: SightsListScreen,
		SightDetails: SightDetailsScreen,
		RouteView: RouteViewScreen,
		RouteList: RouteListScreen,
		AppUseInstruction: AppUseInstructionScreen,
	},
	{
		initialRouteName: 'Index',
		headerLayoutPreset: 'center',
	}
);

const App = createAppContainer(navigator);

export default function() {
	initOfflineSupport();

	return (
		<Provider store={store}>
			<SafeAreaView style={{ flex: 1 }}>
				<App data-test="App" />
				<LoadingScreen data-test="LoadingScreen" />
				<AlertScreen data-test="AlertScreen" />
			</SafeAreaView>
		</Provider>
	);
}
