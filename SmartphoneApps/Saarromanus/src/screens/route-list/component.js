import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import getLocale from '../../hooks/use-current-locale-short';

import styles from './styles';

const RouteListScreen = ({ routes, getRouteList, navigation }) => {
	const [routeLen, setRouteLen] = useState(0);

	useEffect(() => {
		getRouteList();
	}, []);

	useEffect(() => {
		setRouteLen(routes.length - 1);
	}, [routes]);

	return (
		<View style={styles.container}>
			{routes.map((route, ind) => {
				return (
					<View key={route.id} style={styles.container}>
						<TouchableOpacity
							style={styles.textContainer}
							onPress={() =>
								navigation.navigate('RouteView', {
									routeId: route.id,
									routeName: route[getLocale()].name,
								})
							}>
							<Text style={styles.headingText}>
								{route[getLocale()].name}
							</Text>
						</TouchableOpacity>
						{ind !== routeLen && (
							<VerticalSeparator style={styles.separator} />
						)}
					</View>
				);
			})}
		</View>
	);
};

RouteListScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Routes',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
	};
};

export default RouteListScreen;
