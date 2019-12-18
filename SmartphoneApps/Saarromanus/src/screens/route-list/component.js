import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import T from '../../utils/translator';

import styles from './styles';

const RouteListScreen = ({
	routes = ['Route 1', 'Route 2', 'Route 3', 'Route 4'],
	navigation,
}) => {
	const [routeLen, setRouteLen] = useState(0);

	useEffect(() => {
		setRouteLen(routes.length - 1);
	}, [routes]);

	return (
		<View style={styles.container}>
			{routes.map((route, ind) => {
				return (
					<View key={route} style={styles.container}>
						<TouchableOpacity
							style={styles.textContainer}
							onPress={() => navigation.navigate('RouteView')}>
							<Text style={styles.headingText}>{route}</Text>
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
