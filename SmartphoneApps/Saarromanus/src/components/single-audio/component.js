import React, { useEffect, useState } from 'react';
import {
	View,
	Image,
	TouchableOpacity,
	Modal,
	Text,
	TouchableHighlight,
	MaskedViewComponent,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import VerticalSeparator from '../helpers/vertical-separator';

import T from '../../utils/translator';

import styles from './styles';

const SingleAudio = ({ audio, index, status, onPlay }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{audio.title}</Text>
			<MaterialIcons
				name={
					status.isPlaying && status.currentIndex === index
						? 'pause-circle-outline'
						: 'play-circle-outline'
				}
				size={35}
				color={
					status.isPlaying && status.currentIndex === index
						? 'red'
						: 'green'
				}
				onPress={() => {
					onPlay(index);
				}}
			/>
		</View>
	);
};

export default SingleAudio;
