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
			<MapView.Callout style={styles.openGoogleMap}>
				<MaterialIcons
					name="zoom-out-map"
					size={30}
					onPress={() => {
						Linking.openURL(
							`https://www.google.de/maps/dir/R%C3%B6merkastell,+An+der+R%C3%B6merbr%C3%BCcke,+Saarbr%C3%BCcken/Mithraskapelle+am+Halberg,+Brebacher+Landstra%C3%9Fe,+Saarbr%C3%BCcken/R%C3%B6merstadt,+66121+Saarbr%C3%BCcken/R%C3%B6merbrunnen,+Saarbr%C3%BCcken/Schwarzenbergturm,+Saarbr%C3%BCcken/Universit%C3%A4t+des+Saarlandes,+Saarbr%C3%BCcken/Sengscheider+Hof,+Birkenkopfweg,+Sankt+Ingbert/R%C3%B6merkastell,+An+der+R%C3%B6merbr%C3%BCcke,+Saarbr%C3%BCcken/@49.2441204,7.0245877,13z/data=!3m1!4b1!4m50!4m49!1m5!1m1!1s0x4795b42dfcdd4d85:0xb5246619135c69b!2m2!1d7.02401!2d49.22364!1m5!1m1!1s0x4795b432a21dbcb7:0x6728e984c5bdec20!2m2!1d7.0282342!2d49.2224993!1m5!1m1!1s0x4795b42da9046fb9:0xe5baf4fe0a3978f6!2m2!1d7.0265467!2d49.224644!1m5!1m1!1s0x4795b681210317a1:0xffde7a9d1ac80b1e!2m2!1d7.0310198!2d49.2385988!1m5!1m1!1s0x4795b663c2db8155:0x29486ae1e2ce0a10!2m2!1d7.040336!2d49.2468396!1m5!1m1!1s0x4795b65faad2ce4f:0xdf77444e039a71b1!2m2!1d7.040975!2d49.2550284!1m5!1m1!1s0x4795c9c4aae0bc5d:0x7139689dd15112b7!2m2!1d7.0990811!2d49.2535283!1m5!1m1!1s0x4795b42dfcdd4d85:0xb5246619135c69b!2m2!1d7.02401!2d49.22364!3e1`
						);
						console.log('opening google map');
					}}
				/>
			</MapView.Callout>
		</View>
	);
};

export default withNavigation(RouteMap);
