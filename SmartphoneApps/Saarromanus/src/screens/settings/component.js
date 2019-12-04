import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Entypo, AntDesign } from '@expo/vector-icons';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import LabelIcon from '../../components/helpers/label_with_icon';
import SelectLanguage from '../../components/select-language';
import AppGuide from '../../components/app-guide';

import styles from './styles';

const SettingsScreen = ({}) => {
	// useEffect(() => {
	// }, []);

	return (
		<View style={styles.container}>
			<View style={styles.languageContainer}>
				<SelectLanguage />
			</View>
			<AppGuide />
		</View>
	);
};

SettingsScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Settings',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(128, 128, 128, 1)',
		},
	};
};

export default SettingsScreen;
