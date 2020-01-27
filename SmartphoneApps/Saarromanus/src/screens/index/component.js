import React, { useEffect } from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import T from '../../utils/translator';
import useUpdateTranslation from '../../hooks/use-update-translation';

import logo from '../../../assets/logo.png';
import backgroundCover from '../../../assets/background-cover.jpg';
import routesBackground from '../../../assets/routes-background.jpg';
import sightsBackground from '../../../assets/sights-background.jpg';
import gameBackground from '../../../assets/game-background.jpg';

import styles from './styles';

const IndexScreen = ({
	language,
	detectLanguage,
	detectCheckUpdate,
	navigation,
}) => {
	const updateTranslation = useUpdateTranslation();

	useEffect(() => {
		detectLanguage();
		detectCheckUpdate();
	}, []);

	useEffect(() => {
		T.locale = language;
		updateTranslation();
	}, [language]);

	return (
		<View style={styles.container}>
			<ImageBackground
				data-test-id="coverPhoto"
				source={backgroundCover}
				style={styles.logoContainer}
				imageStyle={{
					opacity: 0.6,
					backgroundColor: 'teal',
				}}>
				<Image source={logo} style={styles.logo} />
			</ImageBackground>

			<View
				style={styles.mainOptionsContainer}
				data-test-id="mainOptionsContainer">
				<TouchableOpacity
					data-test-id="routesButton"
					style={styles.singleOptionContainer}
					activeOpacity={0.5}
					onPress={() => navigation.navigate('RouteList')}>
					<ImageBackground
						source={routesBackground}
						style={styles.optionLabelContainer}
						resizeMode="stretch"
						imageStyle={{
							opacity: 0.5,
							backgroundColor: '#020204',
						}}>
						<Text
							numberOfLines={1}
							ellipsizeMode={'tail'}
							style={styles.optionLabel}>
							{T.t('routes').toLocaleUpperCase()}
						</Text>
					</ImageBackground>
				</TouchableOpacity>
				<TouchableOpacity
					data-test-id="sightsButton"
					style={styles.singleOptionContainer}
					activeOpacity={0.5}
					onPress={() => navigation.navigate('Sights')}>
					<ImageBackground
						style={styles.optionLabelContainer}
						source={sightsBackground}
						resizeMode="cover"
						imageStyle={{
							opacity: 0.5,
							backgroundColor: 'green',
						}}>
						<Text
							numberOfLines={1}
							ellipsizeMode={'tail'}
							style={styles.optionLabel}>
							{T.t('sights').toLocaleUpperCase()}
						</Text>
					</ImageBackground>
				</TouchableOpacity>
				<TouchableOpacity
					data-test-id="gameButton"
					style={styles.singleOptionContainer}
					activeOpacity={0.5}
					onPress={
						() => navigation.navigate('')
						// console.log('Loading game screen....')
					}>
					<ImageBackground
						source={gameBackground}
						style={styles.optionLabelContainer}
						resizeMode="cover"
						imageStyle={{
							opacity: 0.5,
							backgroundColor: 'purple',
						}}>
						<Text
							numberOfLines={1}
							ellipsizeMode={'tail'}
							style={styles.optionLabel}>
							{T.t('game').toLocaleUpperCase()}
						</Text>
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
