import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import logo from '../../../assets/logo.png';
import backgroundCover from '../../../assets/background-cover.jpg';

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
					imageStyle={{ opacity: 0.5 }}>
					<Image source={logo} />
				</ImageBackground>
			</View>
			<Text style={styles.label}>Index Screen</Text>
			{message ? <Text style={styles.label}>{message}</Text> : null}
		</View>
	);
};

export default IndexScreen;
