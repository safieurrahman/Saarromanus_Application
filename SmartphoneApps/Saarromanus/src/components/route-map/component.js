import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'expo';

import getLocale from '../../hooks/use-current-locale-short';

import styles from './styles';

const RouteMap = ({ routePath, sights, googleMapURL }) => {
	return (
		<View>
			<MapView
				style={styles.container}
				initialRegion={{
					latitude: 49.255022,
					longitude: 7.041043,
					latitudeDelta: 0.09,
					longitudeDelta: 0.09,
				}}>
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
