import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import getLocale from '../../hooks/use-current-locale-short';
import SingleCategory from '../../components/single-category';
import T from '../../utils/translator';

import {
	insertNewRow,
	SIGHT_CATEGORIES_TABLE,
	findOneById,
} from '../../hooks/use-download-contents';
import { isEqual } from '../../hooks/use-is-equal';
import isConnected from '../../hooks/use-netinfo';
import checkForUpdate from '../../sagas/services/get-sight-categories';

import styles from './styles';

const SightsCategoryScreen = ({
	sightCategories,
	checkUpdateStatus,
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
			const resp = await checkForUpdate().catch(er => {
				// console.log('Server Down')
			});
			if (
				resp &&
				resp.success &&
				!isEqual(resp.payload, sightCategories)
			) {
				// console.log('will update..');
				insertNewRow(
					SIGHT_CATEGORIES_TABLE,
					'1',
					JSON.stringify(resp.payload)
				);
				populateSightCategories(resp.payload);
			}
		};
		if (status === false && sightCategories.length) {
			insertNewRow(
				SIGHT_CATEGORIES_TABLE,
				'1',
				JSON.stringify(sightCategories)
			);
			setStatus(null);
		} else if (
			status === true &&
			checkUpdateStatus &&
			sightCategories.length &&
			connected
		) {
			checkUpdate();
			setStatus(null);
		}
	}, [sightCategories, connected, checkUpdateStatus]);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
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
			</ScrollView>
		</View>
	);
};

SightsCategoryScreen.navigationOptions = ({ navigation }) => {
	return {
		title: T.t('sightCategories'),
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
	};
};

export default SightsCategoryScreen;
