import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';

import SightsList from '../../components/sights-list';
import getLocale from '../../hooks/use-current-locale-short';

import {
	SIGHTS_BY_CATEGORY_TABLE,
	findOneById,
	storeSightsByCategoryAsync,
	mapSightsWithoutDownload,
} from '../../hooks/use-download-contents';
import { isEqual } from '../../hooks/use-is-equal';
import isConnected from '../../hooks/use-netinfo';
import checkForUpdate from '../../sagas/services/get-sights';

import styles from './styles';

const SightsListScreen = ({
	sights,
	checkUpdateStatus,
	getSightsByCategory,
	populateSightsByCategory,
	navigation,
}) => {
	const [status, setStatus] = useState(null);
	const [categoryId, setCategoryId] = useState('');
	const [connected, setConnected] = useState(null);
	isConnected(setConnected);

	useEffect(() => {
		setCategoryId(navigation.getParam('categoryId') + '');
	}, []);

	useEffect(() => {
		if (categoryId) {
			findOneById(
				SIGHTS_BY_CATEGORY_TABLE,
				categoryId,
				setStatus,
				populateSightsByCategory
			);
		}
	}, [categoryId]);

	useEffect(() => {
		if (status === false) {
			getSightsByCategory(categoryId);
		}
	}, [status]);

	useEffect(() => {
		checkUpdate = async () => {
			const resp = await checkForUpdate(categoryId).catch(er =>
				console.log('Oops, Server seems down')
			);
			let respMapped = [];
			if (resp && resp.success && resp.payload) {
				respMapped = mapSightsWithoutDownload(resp.payload);
			}
			if (respMapped && !isEqual(respMapped, sights)) {
				// console.log('will update...');
				await storeSightsByCategoryAsync(
					categoryId,
					resp.payload,
					populateSightsByCategory
				);
			} else {
				// console.log('will not...');
			}
		};
		if (status === false && sights.length) {
			storeSightsByCategoryAsync(
				categoryId,
				sights,
				populateSightsByCategory
			);
			setStatus(null);
		} else if (
			status === true &&
			checkUpdateStatus &&
			sights.length &&
			connected
		) {
			checkUpdate();
			setStatus(null);
		}
	}, [sights, connected, checkUpdateStatus]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{sights.length ? (
				<SightsList locale={getLocale()} sights={sights} />
			) : null}
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
