import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SightsList from '../../components/sights-list';
import RouteMap from '../../components/route-map';
import VerticalSeparator from '../../components/helpers/vertical-separator';
import getLocale from '../../hooks/use-current-locale-short';
import T from '../../utils/translator';

import {
	ROUTE_TABLE,
	findOneById,
	storeRouteAsync,
	mapSightsWithoutDownload,
} from '../../hooks/use-download-contents';
import { isEqual } from '../../hooks/use-is-equal';
import isConnected from '../../hooks/use-netinfo';
import checkForUpdate from '../../sagas/services/get-current-route';
import getSight from '../../sagas/services/get-sight';

import styles from './styles';

const RouteViewScreen = ({
	route,
	checkUpdateStatus,
	getRoute,
	populateRoute,
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
	navigation,
}) => {
	const [status, setStatus] = useState(null);
	const [routeId, setRouteId] = useState('');
	const [connected, setConnected] = useState(null);
	isConnected(setConnected);

	useEffect(() => {
		setRouteId(navigation.getParam('routeId') + '');
		return () => {
			populateRoute({});
		};
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
				showLoadingScreen,
				hideLoadingScreen,
				showAlert,
			});
		}
	}, [status, connected]);

	useEffect(() => {
		checkUpdate = async () => {
			const resp = await checkForUpdate(routeId).catch(er =>
				console.log('Oops, Server seems down')
			);
			let respMapped = [];
			if (resp && resp.success && resp.payload && resp.payload.sights) {
				respMapped = mapSightsWithoutDownload(resp.payload.sights);
			}
			if (
				respMapped &&
				!isEqual({ ...resp.payload, sights: respMapped }, route)
			) {
				// console.log('will update...');
				await storeRouteAsync(resp.payload, getSight);
				showAlert({
					title: 'Found New Update!',
					message: 'The data has been updated',
				});
				findOneById(ROUTE_TABLE, routeId, () => {}, populateRoute);
			}
			// console.log('will not...');
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
		<View style={{ flex: 1 }} data-test-id="mainComponent">
			{route.id && (
				<ScrollView
					contentContainerStyle={styles.container}
					data-test-id="scrollViewcomponent">
					<RouteMap
						routePath={route.routePath}
						sights={route.sights}
						googleMapURL={route.googleMapLink}
					/>
					<Text style={styles.sightHeading}>{T.t('sights')}</Text>
					<VerticalSeparator />
					<SightsList locale={getLocale()} sights={route.sights} />
				</ScrollView>
			)}
		</View>
	);
};

RouteViewScreen.navigationOptions = ({ navigation }) => {
	const routeName = navigation.getParam('routeName', 'Route View');
	const status = navigation.getParam('status', null);
	const route = navigation.getParam('route', {});
	const showLoadingScreen = navigation.getParam('showLoadingScreen');
	const hideLoadingScreen = navigation.getParam('hideLoadingScreen');
	const showAlert = navigation.getParam('showAlert');

	return {
		title: routeName,
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
		headerRight: status === false && route.id && (
			<TouchableOpacity
				onPress={() =>
					storeRouteAsync(route, getSight, showLoadingScreen, () => {
						hideLoadingScreen();
						showAlert({
							title: 'Download Complete',
							message:
								'No Internet? No Problem!\n\nRoute: ' +
								route.en.name +
								' has been successfully downloaded to your device',
						});
					})
				}>
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
