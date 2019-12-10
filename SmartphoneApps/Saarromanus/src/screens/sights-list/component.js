import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';

import VerticalSeparator from '../../components/helpers/vertical-separator';

import SightsList from '../../components/sights-list';

import changeMeLater from '../../../assets/dummy-roman-villa.jpg';

import T from '../../utils/translator';
import styles from './styles';

const getDummySightsList = () => {
	const arr = [];
	for (let i = 0; i < 10; i++) {
		arr.push({
			en: {
				name: 'Roman Villa - ' + i,
				description: 'Roman Villa Dummy Description Text',
			},
			thumbnail: changeMeLater,
		});
	}
	return arr;
};

const SightsListScreen = ({ sights }) => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			{getDummySightsList() && (
				<SightsList sights={getDummySightsList()} />
			)}
		</ScrollView>
	);
};

SightsListScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Sights List',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
	};
};

export default SightsListScreen;
