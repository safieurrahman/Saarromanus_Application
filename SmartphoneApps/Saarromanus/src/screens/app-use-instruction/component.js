import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import LabelIcon from '../../components/helpers/label_with_icon';
import T from '../../utils/translator';
import getLocale from '../../hooks/use-current-locale-short';

import styles from './styles';

const AppUseInstructionScreen = ({ getAppUseInstruction, instruction }) => {
	// const updateTranslation = useUpdateTranslation();

	useEffect(() => {
		getAppUseInstruction();
	}, []);

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			data-test-id="mainContainer">
			{instruction && instruction.en && (
				<View style={styles.view}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<LabelIcon
							label={T.t('welcome')}
							labelFontSize={25}
							labelFontWeight="bold"
							separator
						/>
					</View>
					<View>
						<Text style={styles.label}>
							{instruction[getLocale()].content}
						</Text>
					</View>
				</View>
			)}
		</ScrollView>
	);
};

AppUseInstructionScreen.navigationOptions = ({ navigation }) => {
	return {
		title: T.t('userGuildeline'),
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(128, 128, 128, 1)',
		},
	};
};

export default AppUseInstructionScreen;
