import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import VerticalSeparator from '../../components/helpers/vertical-separator';

import logo from '../../../assets/logo.png';
import backgroundCover from '../../../assets/background-cover.jpg';
import sightsBackground from '../../../assets/sights-background.png';

import styles from './styles';

const IndexScreen = ({ message, updateScreen }) => {
	useEffect(() => {
		updateScreen();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.coverContainer}>
				<ImageBackground
					source={backgroundCover}
					style={styles.logoContainer}
					imageStyle={{ opacity: 0.6, backgroundColor: 'yellow' }}>
					<Image source={logo} />
				</ImageBackground>
			</View>

			<VerticalSeparator />

			<View style={styles.mainOptionsContainer}>
				<ImageBackground
					source={sightsBackground}
					style={styles.optionLabelContainer}
					imageStyle={{ opacity: 0.5, backgroundColor: 'red' }}>
					<Text style={styles.optionLabel}>ROUTES</Text>
				</ImageBackground>

				<VerticalSeparator />

				<ImageBackground
					source={sightsBackground}
					style={styles.optionLabelContainer}
					imageStyle={{ opacity: 0.5, backgroundColor: 'green' }}>
					<Text style={styles.optionLabel}>SIGHTS</Text>
				</ImageBackground>

				<VerticalSeparator />

				<ImageBackground
					source={sightsBackground}
					style={styles.optionLabelContainer}
					imageStyle={{ opacity: 0.5, backgroundColor: 'blue' }}>
					<Text style={styles.optionLabel}>GAMES</Text>
				</ImageBackground>
			</View>
		</View>
	);
};

export default IndexScreen;
