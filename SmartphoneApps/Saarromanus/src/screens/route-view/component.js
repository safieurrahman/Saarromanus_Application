import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import SightsList from '../../components/sights-list';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import RouteMap from '../../components/route-map';

import dummyImage from '../../../assets/dummy-roman-villa.jpg';

import T from '../../utils/translator';
import styles from './styles';

const dummyWaypoints = [
	{
		title: 'Römerkastell',
		latitude: 49.223798,
		longitude: 7.024046,
	},
	{
		title: 'Mithraskapelle am Halberg',
		latitude: 49.222481,
		longitude: 7.028262,
	},
	{
		title: 'Römerstadt',
		latitude: 49.22476,
		longitude: 7.027018,
	},
	{
		title: 'Römerbrunnen',
		latitude: 49.238264,
		longitude: 7.03135,
	},
	{
		title: 'Schwarzenbergturm',
		latitude: 49.246836,
		longitude: 7.040374,
	},
	{
		title: 'Saarland University',
		latitude: 49.255022,
		longitude: 7.041043,
	},
	{
		title: 'Sengscheider Hof',
		latitude: 49.253514,
		longitude: 7.099069,
	},
];

const getDummySightsList = () => {
	const arr = [];
	for (let i = 0; i < 7; i++) {
		arr.push({
			id: i,
			en: {
				name: dummyWaypoints[i].title,
				description: 'Dummy Description Text',
			},
			geo_location: {
				latitude: dummyWaypoints[i].latitude,
				longitude: dummyWaypoints[i].longitude,
			},
			thumbnail: dummyImage,
		});
	}
	return arr;
};

const RouteViewScreen = ({ routes }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				<RouteMap sights={getDummySightsList()} />
				<Text style={styles.sightHeading}>Sights</Text>
				<VerticalSeparator />
				{getDummySightsList() && (
					<SightsList sights={getDummySightsList()} />
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

RouteViewScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Saarland Route',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
	};
};

export default RouteViewScreen;
