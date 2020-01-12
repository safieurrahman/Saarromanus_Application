import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import getLocale from '../../hooks/use-current-locale-short';
import SingleCategory from '../../components/single-category';

import {
	insertNewRow,
	SIGHT_CATEGORIES_TABLE,
	findOneById,
} from '../../hooks/use-download-contents';
import isConnected from '../../hooks/use-netinfo';
import checkForUpdate from '../../sagas/services/get-sight-categories';

import styles from './styles';

const SightsCategoryScreen = ({
	sightCategories,
	getSightCategories,
	populateSightCategories,
}) => {
	const [status, setStatus] = useState(null);
	const [connected, setConnected] = useState(null);
	isConnected(setConnected);

	useEffect(() => {
		findOneById(
			SIGHT_CATEGORIES_TABLE,
			'1',
			setStatus,
			populateSightCategories
		);
	}, []);

	useEffect(() => {
		if (status === false) {
			getSightCategories();
		}
	}, [status]);

	useEffect(() => {
		checkUpdate = async () => {
			const resp = await checkForUpdate().catch(er =>
				console.log('Server Down')
			);
			if (
				resp &&
				JSON.stringify(resp) !== JSON.stringify(sightCategories)
			) {
				insertNewRow(SIGHT_CATEGORIES_TABLE, '1', JSON.stringify(resp));
				populateSightCategories(resp);
			}
		};
		if (status === false && sightCategories.length) {
			insertNewRow(
				SIGHT_CATEGORIES_TABLE,
				'1',
				JSON.stringify(sightCategories)
			);
		} else if (status === true && sightCategories.length && connected) {
			checkUpdate();
		}
	}, [sightCategories, connected]);

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
