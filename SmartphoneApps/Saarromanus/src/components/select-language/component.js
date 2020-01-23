import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import LabelIcon from '../../components/helpers/label_with_icon';
import T from '../../utils/translator';

import styles from './styles';

const SelectLanguage = ({ language, storeLanguage }) => {
	const getLanguageOptions = () => {
		const SUPPORTED_LANGUAGES = ['en-US', 'de-DE', 'fr-FR']; // TODO:KAZI: Get it from the env file ???
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
							backgroundColor="#008080bb"
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
							backgroundColor="#a9a9a9"
							flexible
						/>
					</TouchableOpacity>
				)
			);
		});
		return options;
	};

	return (
		<View style={styles.view}>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<LabelIcon
					iconEl={
						<Entypo name="language" size={30} color={'#000000'} />
					}
					label={T.t('changeLanguage')}
					labelFontSize={25}
					labelFontWeight="bold"
					separator
				/>
			</View>
			<View style={styles.contentContainer}>{getLanguageOptions()}</View>
		</View>
	);
};

export default SelectLanguage;
