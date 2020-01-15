import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'expo';

import getLocale from '../../hooks/use-current-locale-short';

import styles from './styles';

const getRegionForCoordinates = points => {
	let minX, maxX, minY, maxY;

	(point => {
		minX = point.latitude;
		maxX = point.latitude;
		minY = point.longitude;
		maxY = point.longitude;
	})(points[0]);

	points.map(point => {
		minX = Math.min(minX, point.latitude);
		maxX = Math.max(maxX, point.latitude);
		minY = Math.min(minY, point.longitude);
		maxY = Math.max(maxY, point.longitude);
	});

	const midX = (minX + maxX) / 2;
	const midY = (minY + maxY) / 2;
	const deltaX = maxX - minX;
	const deltaY = maxY - minY;

	return {
		latitude: midX,
		longitude: midY,
		latitudeDelta: deltaX,
		longitudeDelta: deltaY,
	};
};
const RouteMap = ({ routePath, sights, googleMapURL }) => {
	const [initialRegion, setInitialRegion] = useState({});

	useEffect(() => {
		setInitialRegion(getRegionForCoordinates(routePath));
	}, [routePath]);
	return (
		<View>
			{initialRegion.latitude && (
				<MapView style={styles.container} initialRegion={initialRegion}>
					{sights.map(sight => (
						<MapView.Marker
							key={sight.id + ''}
							coordinate={sight.coordinate}
							opacity={0.7}
						/>
					))}
					<MapView.Polyline
						coordinates={[
							...routePath.map(point => ({
								latitude: point.latitude,
								longitude: point.longitude,
							})),
							{
								latitude: routePath[0].latitude,
								longitude: routePath[0].longitude,
							},
						]}
						strokeWidth={2}
						strokeColor="blue"
					/>
				</MapView>
			)}
			<MapView.Callout style={styles.openGoogleMap}>
				<MaterialIcons
					name="zoom-out-map"
					size={30}
					onPress={() => {
						Linking.openURL(googleMapURL);
					}}
				/>
			</MapView.Callout>
		</View>
	);
};

export default withNavigation(RouteMap);
