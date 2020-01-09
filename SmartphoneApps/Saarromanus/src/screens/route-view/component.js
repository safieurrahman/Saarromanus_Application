import React, { useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SightsList from '../../components/sights-list';
import RouteMap from '../../components/route-map';
import VerticalSeparator from '../../components/helpers/vertical-separator';

import styles from './styles';

const RouteViewScreen = ({ route, getRoute, navigation }) => {
	useEffect(() => {
		const routeId = navigation.getParam('routeId');
		getRoute(routeId);
	}, []);
	return (
		<View style={{ flex: 1 }}>
			{route.id && (
				<ScrollView contentContainerStyle={styles.container}>
					<RouteMap
						routePath={route.routePath}
						sights={route.sights}
						googleMapURL={route.googleMapURL}
					/>
					<Text style={styles.sightHeading}>Sights</Text>
					<VerticalSeparator />
					<SightsList sights={route.sights} />
				</ScrollView>
			)}
		</View>
	);
};

RouteViewScreen.navigationOptions = ({ navigation }) => {
	const routeName = navigation.getParam('routeName', 'Route View');
	return {
		title: routeName,
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
		headerRight: (
			<TouchableOpacity
				onPress={() => console.log('Donwloading current route...')}>
				<MaterialCommunityIcons
					name="download-multiple"
					size={30}
					color={'#dddddd'}
					style={styles.icon}
				/>
			</TouchableOpacity>
		),
	};
};

export default RouteViewScreen;
