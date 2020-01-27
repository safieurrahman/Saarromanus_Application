import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';

import SingleAudio from '../single-audio';

import styles from './styles';

const AudioPlayer = ({ audios }) => {
	const [currentIndex, setCurrentIndex] = useState(null);
	const [soundObject, setSoundObject] = useState({});
	const [isPlaying, setIsPlaying] = useState(false);

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
			const source = { uri: audios[currentIndex].url };
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
				// console.log(error);
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
						key={index}
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
