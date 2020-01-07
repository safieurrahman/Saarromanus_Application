import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
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
import routesBackground from '../../../assets/routes-background.jpg';
import sightsBackground from '../../../assets/sights-background.jpg';
import gameBackground from '../../../assets/game-background.jpg';

import styles from './styles';

const IndexScreen = ({ language, detectLanguage, navigation, DB }) => {
	const updateTranslation = useUpdateTranslation();

	const createSightsTable = () => {
		DB.transaction(tx => {
			tx.executeSql(
				'create table if not exists sights (id varchar(200) primary key not null, name varchar(200), description text);'
			);
		});
	};

	const insertSight = () => {
		DB.transaction(tx => {
			tx.executeSql(
				'insert into sights (id, name, description) values (?, ?, ?)',
				['new_id_123', 'Dudweiler', 'New Lorem Ipsum Doller Sit Amet'],
				() => {
					console.log('Inserted Data');
				},
				err => {
					console.log('INSERTION_ERROR:');
				}
			);
			tx.executeSql('select * from sights', [], (_, { rows }) =>
				console.log('Sights Rows', JSON.stringify(rows))
			);
		});
	};

	useEffect(() => {
		// createSightsTable();
		insertSight();
		detectLanguage();
	}, []);

	useEffect(() => {
		T.locale = language;
		updateTranslation();
	}, [language]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.coverContainer}>
				<ImageBackground
					source={backgroundCover}
					style={styles.logoContainer}
					imageStyle={{
						opacity: 0.6,
						backgroundColor: 'teal',
					}}>
					<Image source={logo} style={styles.logo} />
				</ImageBackground>
			</View>

			<VerticalSeparator />

			<View style={styles.mainOptionsContainer}>
				<TouchableOpacity
					style={styles.singleOptionContainer}
					activeOpacity={0.5}
					onPress={() => navigation.navigate('RouteView')}>
					<ImageBackground
						source={routesBackground}
						style={styles.optionLabelContainer}
						resizeMode="stretch"
						imageStyle={{
							opacity: 0.5,
							backgroundColor: '#020204',
						}}>
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
						resizeMode="cover"
						imageStyle={{
							opacity: 0.5,
							backgroundColor: 'green',
						}}>
						<Text numberOfLines={1} style={styles.optionLabel}>
							{T.t('sights')}
						</Text>
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
						source={gameBackground}
						style={styles.optionLabelContainer}
						resizeMode="cover"
						imageStyle={{
							opacity: 0.5,
							backgroundColor: 'purple',
						}}>
						<Text style={styles.optionLabel}>{T.t('game')}</Text>
					</ImageBackground>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
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
