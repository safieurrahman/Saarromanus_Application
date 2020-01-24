import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import VerticalSeparator from '../../components/helpers/vertical-separator';

import ImageGallery from '../../components/image-gallery';
import AudioPlayer from '../../components/audio-player';
import TextBox from '../../components/text-box';

import getLocale from '../../hooks/use-current-locale-short';
import T from '../../utils/translator';

import {
	storeSightAsync,
	mapSightWithoutDownload,
	SIGHT_TABLE,
	findOneById,
} from '../../hooks/use-download-contents';
import isConnected from '../../hooks/use-netinfo';
import { isEqual } from '../../hooks/use-is-equal';
import checkForUpdate from '../../sagas/services/get-sight';

import styles from './styles';

const SightDetailsScreen = ({
	sight,
	checkUpdateStatus,
	getSight,
	populateSight,
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
	navigation,
}) => {
	const [status, setStatus] = useState(null);
	const [sightId, setSightId] = useState('');
	const [connected, setConnected] = useState(null);
	isConnected(setConnected);

	useEffect(() => {
		setSightId(navigation.getParam('sightId'));
		return () => {
			populateSight({});
		};
	}, []);

	useEffect(() => {
		if (sightId) {
			findOneById(SIGHT_TABLE, sightId, setStatus, populateSight);
		}
	}, [sightId]);

	useEffect(() => {
		// console.log('status', status);
		if (status === false) {
			getSight(sightId);
		}
	}, [status]);

	useEffect(() => {
		if (status === false && connected) {
			navigation.setParams({
				status: false,
				setStatus,
				showLoadingScreen,
				hideLoadingScreen,
				showAlert,
			});
		}
	}, [status, connected]);

	useEffect(() => {
		checkUpdate = async () => {
			const resp = await checkForUpdate(sightId).catch(er =>
				console.log('Oops, Server seems down')
			);
			let respMapped = {};
			if (resp && resp.success && resp.payload) {
				respMapped = mapSightWithoutDownload(resp.payload);
			}
			if (respMapped && !isEqual(respMapped, sight)) {
				// console.log('will update...');
				await storeSightAsync(resp.payload);
				showAlert({
					title: 'Found New Update!',
					message: 'The data has been updated',
				});
				findOneById(SIGHT_TABLE, sightId, () => {}, populateSight);
			}
			// else {
			// 	console.log('sight: will not');
			// }
		};
		if (
			status === true &&
			checkUpdateStatus &&
			sight &&
			sight.id &&
			connected
		) {
			// console.log('checking for update..');
			checkUpdate();
			setStatus(null);
		}
	}, [sight, connected, checkUpdateStatus]);

	useEffect(() => {
		navigation.setParams({
			sight,
		});
	}, [sight]);

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			data-test-id="scrollViewMainContainer">
			<View>
				{sight.resources && (
					<ImageGallery
						images={sight.resources.filter(
							item => item.type.indexOf('image') !== -1
						)}
						language={getLocale()}
					/>
				)}
			</View>
			<VerticalSeparator marginVertical={5} />
			{sight.resources && (
				<AudioPlayer
					audios={sight.resources.filter(
						item => item.type.indexOf('audio') !== -1
					)}
				/>
			)}
			<VerticalSeparator marginVertical={5} />
			{sight[getLocale()] && (
				<TextBox
					heading={`${T.t('moreAbout')} ${sight[getLocale()].name}`}
					text={sight[getLocale()].information}
				/>
			)}
		</ScrollView>
	);
};

SightDetailsScreen.navigationOptions = ({ navigation }) => {
	const sight = navigation.getParam('sight', {});
	let status = navigation.getParam('status', null);
	const showLoadingScreen = navigation.getParam('showLoadingScreen');
	const hideLoadingScreen = navigation.getParam('hideLoadingScreen');
	const showAlert = navigation.getParam('showAlert');
	return {
		title: T.t('sightDetails'),
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
		headerRight: status === false && sight.id && (
			<TouchableOpacity
				onPress={() =>
					storeSightAsync(sight, showLoadingScreen, () => {
						hideLoadingScreen();
						showAlert({
							title: 'Download Complete!',
							message:
								'No Internet? No Problem!\n\nSight: ' +
								sight[getLocale()].name +
								' has been successfully downloaded to your device',
						});
					})
				}>
				<MaterialCommunityIcons
					name="download"
					size={30}
					color={'#dddddd'}
					style={styles.icon}
				/>
			</TouchableOpacity>
		),
	};
};

export default SightDetailsScreen;
