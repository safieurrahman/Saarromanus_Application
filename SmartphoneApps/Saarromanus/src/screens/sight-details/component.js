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
	SIGHT_TABLE,
	findOneById,
} from '../../hooks/use-download-contents';

import styles from './styles';

const SightDetailsScreen = ({ sight, getSight, populateSight, navigation }) => {
	const [status, setStatus] = useState(null);
	const [sightId, setSightId] = useState('');

	useEffect(() => {
		setSightId(navigation.getParam('sightId') + '');
	}, []);

	useEffect(() => {
		if (sightId) {
			findOneById(SIGHT_TABLE, sightId, setStatus, populateSight);
		}
	}, [sightId]);

	useEffect(() => {
		// console.log(status);
		if (status === false) {
			const sightId = navigation.getParam('sightId');
			getSight(sightId);
		}
		navigation.setParams({
			status,
		});
	}, [status]);

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
	const status = navigation.getParam('status', false);
	return {
		title: 'Sight Details',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
		headerRight: status !== true && (
			<TouchableOpacity onPress={() => storeSightAsync(sight)}>
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
