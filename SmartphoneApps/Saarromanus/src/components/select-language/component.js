import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import LabelIcon from '../../components/helpers/label_with_icon';
import T from '../../utils/translator';

import styles from './styles';

const getLanguageOptions = selectedLanguage => {
	const SUPPORTED_LANGUAGES = ['english', 'german']; // TODO:KAZI: Get it from the env file
	const options = [];
	SUPPORTED_LANGUAGES.forEach(language => {
		options.push(
			language === selectedLanguage ? (
				<TouchableOpacity
					key={language}
					disabled={true}
					style={styles.optionsContainer}>
					<LabelIcon
						iconEl={
							<MaterialIcons
								name="done"
								size={20}
								color={'#ffffff'}
							/>
						}
						label={language}
						backgroundColor="#007BFF"
						absoluteIconPosition="left"
						flexible
					/>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					key={language}
					style={styles.optionsContainer}>
					<LabelIcon
						label={language}
						backgroundColor="#6C757D"
						flexible
					/>
				</TouchableOpacity>
			)
		);
	});
	return options;
};

const SelectLanguage = ({ selectedLanguage }) => {
	// useEffect(() => {
	// }, []);

	return (
		<Card
			containerStyle={styles.card}
			title={
				<LabelIcon
					iconEl={
						<Entypo name="language" size={30} color={'#000000'} />
					}
					label={T.t('changeLanguage')}
					labelFontSize={25}
					labelFontWeight="bold"
					separator
				/>
			}>
			<View style={styles.contentContainer}>
				{getLanguageOptions('english')}
			</View>
		</Card>
	);
};

export default SelectLanguage;
