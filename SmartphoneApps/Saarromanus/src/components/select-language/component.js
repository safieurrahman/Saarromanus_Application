import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import LabelIcon from '../../components/helpers/label_with_icon';
import T from '../../utils/translator';

import styles from './styles';

const SelectLanguage = ({ language, storeLanguage }) => {
	const getLanguageOptions = () => {
		const SUPPORTED_LANGUAGES = ['en-US', 'de-DE']; // TODO:KAZI: Get it from the env file ???
		const options = [];
		SUPPORTED_LANGUAGES.forEach(lang => {
			options.push(
				lang === language ? (
					<TouchableOpacity
						key={lang}
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
							label={T.t(lang)}
							backgroundColor="#007BFF"
							absoluteIconPosition="left"
							flexible
						/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={() => {
							storeLanguage(lang);
						}}
						key={lang}
						style={styles.optionsContainer}>
						<LabelIcon
							label={T.t(lang)}
							backgroundColor="#6C757D"
							flexible
						/>
					</TouchableOpacity>
				)
			);
		});
		return options;
	};

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
			<View style={styles.contentContainer}>{getLanguageOptions()}</View>
		</Card>
	);
};

export default SelectLanguage;
