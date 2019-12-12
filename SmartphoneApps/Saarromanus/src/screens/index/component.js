import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import T from '../../utils/translator';
import useUpdateTranslation from '../../hooks/use-update-translation';

import logo from '../../../assets/logo.png';
import backgroundCover from '../../../assets/background-cover.jpg';
import sightsBackground from '../../../assets/sights-background.png';

import styles from './styles';

const IndexScreen = ({ language, detectLanguage, navigation }) => {
	const updateTranslation = useUpdateTranslation();

	useEffect(() => {
		detectLanguage();
	}, []);

	useEffect(() => {
		T.locale = language;
		updateTranslation();
	}, [language]);

	return (
		<View style={styles.container}>
			<View style={styles.coverContainer}>
				<ImageBackground
					source={backgroundCover}
					style={styles.logoContainer}
					imageStyle={{ opacity: 0.6, backgroundColor: 'yellow' }}>
					<Image source={logo} style={styles.logo} />
				</ImageBackground>
			</View>

			<VerticalSeparator />

			<View style={styles.mainOptionsContainer}>
				<TouchableOpacity
					style={styles.singleOptionContainer}
					activeOpacity={0.5}
					onPress={() =>
						// navigation.navigate('foobar')
						console.log('Loading routes screen...')
					}>
					<ImageBackground
						source={sightsBackground}
						style={styles.optionLabelContainer}
						imageStyle={{ opacity: 0.5, backgroundColor: 'red' }}>
						<Text style={styles.optionLabel}>{T.t('routes')}</Text>
					</ImageBackground>
				</TouchableOpacity>
				<VerticalSeparator />
				<TouchableOpacity
					style={styles.singleOptionContainer}
					activeOpacity={0.5}
					onPress={() => navigation.navigate('Sights')}>
					<ImageBackground
						style={styles.optionLabelContainer}
						source={sightsBackground}
						imageStyle={{ opacity: 0.5, backgroundColor: 'green' }}>
						<Text style={styles.optionLabel}>{T.t('sights')}</Text>
					</ImageBackground>
				</TouchableOpacity>
				<VerticalSeparator />
				<TouchableOpacity
					style={styles.singleOptionContainer}
					activeOpacity={0.5}
					onPress={() =>
						// navigation.navigate('foobar')
						console.log('Loading game screen...')
					}>
					<ImageBackground
						source={sightsBackground}
						style={styles.optionLabelContainer}
						imageStyle={{ opacity: 0.5, backgroundColor: 'blue' }}>
						<Text style={styles.optionLabel}>{T.t('game')}</Text>
					</ImageBackground>
				</TouchableOpacity>
			</View>
		</View>
	);
};

IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Saarromanus',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(0, 128, 128, 1)',
		},
		headerRight: (
			<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
				<Ionicons
					name="md-options"
					size={30}
					color={'#dddddd'}
					style={styles.icon}
				/>
			</TouchableOpacity>
		),
	};
};

export default IndexScreen;
