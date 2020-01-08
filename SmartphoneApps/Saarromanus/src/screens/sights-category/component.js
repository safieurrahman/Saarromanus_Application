import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import getLocale from '../../hooks/use-current-locale-short';
import SingleCategory from '../../components/single-category';

import styles from './styles';

const SightsCategoryScreen = ({ sightCategories, getSightCategories }) => {
	useEffect(() => {
		getSightCategories();
	}, []);

	return (
		<View style={styles.container}>
			{sightCategories.map(category => {
				return (
					<SingleCategory
						key={category.id + ''}
						id={category.id}
						iconName="crop-original"
						categoryName={category[getLocale()].name}
					/>
				);
			})}
		</View>
	);
};

SightsCategoryScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Sight Categories',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
	};
};

export default SightsCategoryScreen;
