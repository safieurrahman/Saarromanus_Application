import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import VerticalSeparator from '../../components/helpers/vertical-separator';

import ImageGallery from '../../components/image-gallery';
import AudioPlayer from '../../components/audio-player';
import TextBox from '../../components/text-box';

import dummyAudio1 from '../../../assets/bensound-summer.mp3';
import dummyAudio2 from '../../../assets/bensound-ab.mp3';
import dummyImage1 from '../../../assets/background-cover.jpg';
import dummyImage2 from '../../../assets/dummy-roman-villa.jpg';

import T from '../../utils/translator';
import styles from './styles';

const dummySightDetail = {
	en: {
		name: 'Roman Villa',
		description: 'Dummy Site Description',
		details:
			"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
	},
	resources: [
		{ type: 'audio/mpeg', url: dummyAudio1, title: 'Summer' },
		{ type: 'audio/mpeg', url: dummyAudio2, title: 'Acoustic' },
		{ type: 'image/jpeg', url: dummyImage1, title: 'Image 1' },
		{ type: 'image/jpeg', url: dummyImage2, title: 'Image 2' },
	],
};

const SightDetailsScreen = ({ sight }) => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View>
				<ImageGallery
					images={dummySightDetail.resources.filter(
						item => item.type.indexOf('image') !== -1
					)}
				/>
			</View>
			<VerticalSeparator marginVertical={5} />
			<AudioPlayer
				audios={dummySightDetail.resources.filter(
					item => item.type.indexOf('audio') !== -1
				)}
			/>
			<VerticalSeparator marginVertical={5} />
			<TextBox
				heading={`More About ${dummySightDetail.en.name}`}
				text={dummySightDetail.en.details}
			/>
		</ScrollView>
	);
};

SightDetailsScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Sight Details',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
		headerRight: (
			<TouchableOpacity
				onPress={() => console.log('Donwloading current sight...')}>
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
