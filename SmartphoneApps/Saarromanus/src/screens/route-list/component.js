import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import getLocale from '../../hooks/use-current-locale-short';

import {
	insertNewRow,
	ROUTE_LIST_TABLE,
	findOneById,
} from '../../hooks/use-download-contents';
import isConnected from '../../hooks/use-netinfo';
import checkForUpdate from '../../sagas/services/get-route-list';

import styles from './styles';

const RouteListScreen = ({
	routes,
	getRouteList,
	populateRouteList,
	navigation,
}) => {
	const [routeLen, setRouteLen] = useState(0);
	const [status, setStatus] = useState(null);
	const [connected, setConnected] = useState(null);
	isConnected(setConnected);

	useEffect(() => {
		setRouteLen(routes.length - 1);
	}, [routes]);

	useEffect(() => {
		findOneById(ROUTE_LIST_TABLE, '1', setStatus, populateRouteList);
	}, []);

	useEffect(() => {
		if (status === false) {
			getRouteList();
		}
	}, [status]);

	useEffect(() => {
		checkUpdate = async () => {
			const resp = await checkForUpdate().catch(er =>
				console.log('Server Down')
			);
			if (resp && JSON.stringify(resp) !== JSON.stringify(routes)) {
				console.log('will update...');
				insertNewRow(ROUTE_LIST_TABLE, '1', JSON.stringify(resp));
				populateRouteList(resp);
			}
		};
		if (status === false && routes.length) {
			insertNewRow(ROUTE_LIST_TABLE, '1', JSON.stringify(routes));
			setStatus(null);
		} else if (status === true && routes.length && connected) {
			checkUpdate();
			setStatus(null);
		}
	}, [routes, connected]);

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
