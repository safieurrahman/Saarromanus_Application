import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';

import SightsList from '../../components/sights-list';

import styles from './styles';

const SightsListScreen = ({ sights, getSightsByCategory, navigation }) => {
	useEffect(() => {
		const categoryId = navigation.getParam('categoryId');
		getSightsByCategory(categoryId);
	}, []);
	return (
		<ScrollView contentContainerStyle={styles.container}>
			{sights.length ? <SightsList sights={sights} /> : null}
		</ScrollView>
	);
};

SightsListScreen.navigationOptions = ({ navigation }) => {
	const title = navigation.getParam('categoryName', '');
	return {
		title: title ? 'Sights List - ' + title : 'Sights List',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
	};
};

export default SightsListScreen;
