import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import T from '../../utils/translator';

import SingleCategory from '../../components/single-category';

import styles from './styles';

const SightsCategoryScreen = () => {
	// useEffect(() => {}, []);

	return (
		<View style={styles.container}>
			<SingleCategory iconName="all-inclusive" categoryName="ALL" />
			<VerticalSeparator />
			<SingleCategory iconName="art-track" categoryName="SETTLEMENTS" />
			<VerticalSeparator />
			<SingleCategory
				iconName="account-balance"
				categoryName="ROMAN VILLAS"
			/>
			<VerticalSeparator />
			<SingleCategory iconName="filter-hdr" categoryName="SANCTUARIES" />
		</View>
	);
};

SightsCategoryScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Sights',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
	};
};

export default SightsCategoryScreen;
