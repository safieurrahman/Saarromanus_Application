import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import VerticalSeparator from '../../components/helpers/vertical-separator';

import ImageGallery from '../../components/image-gallery';
import AudioPlayer from '../../components/audio-player';
import TextBox from '../../components/text-box';

import getLocale from '../../hooks/use-current-locale-short';
import {
	storeSightAsync,
	mapSightWithoutDownload,
	SIGHT_TABLE,
	findOneById,
} from '../../hooks/use-download-contents';
import isConnected from '../../hooks/use-netinfo';
import checkForUpdate from '../../sagas/services/get-sight';

import styles from './styles';

const SightDetailsScreen = ({
	sight,
	checkUpdateStatus,
	getSight,
	populateSight,
	showLoadingScreen,
	hideLoadingScreen,
	navigation,
}) => {
	const [status, setStatus] = useState(null);
	const [sightId, setSightId] = useState('');
	const [connected, setConnected] = useState(null);
	isConnected(setConnected);

	useEffect(() => {
		setSightId(navigation.getParam('sightId') + '');
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
				showLoadingScreen,
				hideLoadingScreen,
			});
		}
	}, [status, connected]);

	useEffect(() => {
		checkUpdate = async () => {
			const resp = await checkForUpdate(sightId).catch(er =>
				console.log('Oops, Server seems down')
			);
			let respMapped = '';
			if (resp) {
				respMapped = mapSightWithoutDownload(resp);
			}
			if (
				respMapped &&
				JSON.stringify(respMapped) !== JSON.stringify(sight)
			) {
				// console.log('will update...');
				await storeSightAsync(resp);
			}
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
		} else {
			// console.log('will not..');
		}
	}, [sight, connected, checkUpdateStatus]);

	useEffect(() => {
		navigation.setParams({
			sight,
		});
	}, [sight]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View>
				{sight.resources && (
					<ImageGallery
						images={sight.resources.filter(
							item => item.type.indexOf('image') !== -1
						)}
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
					heading={`More About ${sight.name}`}
					text={sight[getLocale()].description}
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
	return {
		title: 'Sight Details',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
		headerRight: status === false && (
			<TouchableOpacity
				onPress={() => {
					storeSightAsync(
						sight,
						showLoadingScreen,
						hideLoadingScreen
					);
				}}>
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
