import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SightsList from '../../components/sights-list';
import RouteMap from '../../components/route-map';
import VerticalSeparator from '../../components/helpers/vertical-separator';

import {
	ROUTE_TABLE,
	findOneById,
	storeRouteAsync,
	mapSightsWithoutDownload,
} from '../../hooks/use-download-contents';
import isConnected from '../../hooks/use-netinfo';
import checkForUpdate from '../../sagas/services/get-current-route';
import getSight from '../../sagas/services/get-sight';

import styles from './styles';

const RouteViewScreen = ({
	route,
	checkUpdateStatus,
	getRoute,
	populateRoute,
	navigation,
}) => {
	const [status, setStatus] = useState(null);
	const [routeId, setRouteId] = useState('');
	const [connected, setConnected] = useState(null);
	isConnected(setConnected);

	useEffect(() => {
		setRouteId(navigation.getParam('routeId') + '');
	}, []);

	useEffect(() => {
		if (routeId) {
			findOneById(ROUTE_TABLE, routeId, setStatus, populateRoute);
		}
	}, [routeId]);

	useEffect(() => {
		// console.log('status', status);
		if (status === false) {
			getRoute(routeId);
		}
	}, [status]);

	useEffect(() => {
		if (status === false && connected) {
			navigation.setParams({
				status: false,
			});
		}
	}, [status, connected]);

	useEffect(() => {
		checkUpdate = async () => {
			const resp = await checkForUpdate(routeId).catch(er =>
				console.log('Oops, Server seems down')
			);
			let respMapped = '';
			if (resp) {
				respMapped = mapSightsWithoutDownload(resp.sights);
			}
			if (
				respMapped &&
				JSON.stringify({ ...resp, sights: respMapped }) !==
					JSON.stringify(route)
			) {
				// console.log('will update...');
				await storeRouteAsync(resp, getSight);
			}
		};
		if (
			status === true &&
			checkUpdateStatus &&
			route &&
			route.id &&
			connected
		) {
			// console.log('checking for update..');
			checkUpdate();
			setStatus(null);
		}
	}, [route, connected, checkUpdateStatus]);

	useEffect(() => {
		navigation.setParams({
			route,
		});
	}, [route]);

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
	const status = navigation.getParam('status', null);
	const route = navigation.getParam('route', {});
	return {
		title: routeName,
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
		headerRight: status === false && (
			<TouchableOpacity onPress={() => storeRouteAsync(route, getSight)}>
				<MaterialCommunityIcons
					name="download-multiple"
					size={30}
					color={'#dddddd'}
					style={styles.icon}
					disabled
				/>
			</TouchableOpacity>
		),
	};
};

export default RouteViewScreen;
