import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'expo';

import T from '../../utils/translator';

import styles from './styles';

const RouteMap = ({ sights }) => {
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
						key={sight.en.name}
						coordinate={sight.geo_location}
						opacity={0.7}
					/>
				))}
				<MapView.Polyline
					coordinates={[
						...sights.map(sight => ({
							latitude: sight.geo_location.latitude,
							longitude: sight.geo_location.longitude,
						})),
						{
							latitude: sights[0].geo_location.latitude,
							longitude: sights[0].geo_location.longitude,
						},
					]}
					strokeWidth={2}
					strokeColor="blue"
				/>
			</MapView>
		</View>
	);
};

export default withNavigation(RouteMap);
