import React, { useEffect, useState, useCallback } from 'react';
import {
	View,
	Image,
	TouchableOpacity,
	Modal,
	Text,
	TouchableHighlight,
} from 'react-native';
import { Audio } from 'expo-av';

import { MaterialIcons } from '@expo/vector-icons';

import VerticalSeparator from '../helpers/vertical-separator';
import SingleAudio from '../single-audio';

import T from '../../utils/translator';

import dummyAudio1 from '../../../assets/bensound-summer.mp3';

import styles from './styles';
import SingleSight from '../single-sight/component';

const AudioPlayer = ({ audios }) => {
	const [currentIndex, setCurrentIndex] = useState(null);
	const [soundObject, setSoundObject] = useState({});
	const [isPlaying, setIsPlaying] = useState(false);

	// useEffect(() => {
	// 	const loadAudio = async () => {
	// 		try {
	// 			const {
	// 				sound: soundObject,
	// 				status,
	// 			} = await Audio.Sound.createAsync(dummyAudio1, {
	// 				shouldPlay: false,
	// 			});
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	loadAudio();
	// }, [dummyAudio1]);

	const handlePlay = index => {
		if (index === currentIndex && isPlaying) {
			soundObject.pauseAsync();
			setIsPlaying(false);
		} else if (index === currentIndex && !isPlaying) {
			soundObject.playAsync();
			setIsPlaying(true);
		} else {
			isPlaying && soundObject.stopAsync();
			setCurrentIndex(index);
		}
	};

	useEffect(() => {
		const loadAudio = async () => {
			// const source = {uri: 'https://somewhere.com'}
			const source = audios[currentIndex].url;
			try {
				const {
					sound: soundObj,
					status,
				} = await Audio.Sound.createAsync(source, {
					shouldPlay: true,
				});
				setSoundObject(soundObj);
				setIsPlaying(status.isPlaying);
			} catch (error) {
				console.log(error);
			}
		};
		if (currentIndex !== null) {
			loadAudio();
		}
	}, [currentIndex]);

	useEffect(() => {
		return () => {
			isPlaying && soundObject.stopAsync();
		};
	});

	return (
		<View style={styles.container}>
			{audios.map((audio, index) => {
				return (
					<SingleAudio
						key={audio.title}
						audio={audio}
						index={index}
						status={{ currentIndex, isPlaying }}
						onPlay={handlePlay}
					/>
				);
			})}
		</View>
	);
};

export default AudioPlayer;
