import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import SelectLanguage from '../../components/select-language';
import AppGuide from '../../components/app-guide';
import ToggleBox from '../../components/toggle-box';
import T from '../../utils/translator';
import useUpdateTranslation from '../../hooks/use-update-translation';

import styles from './styles';

const SettingsScreen = ({
	language,
	storeLanguage,
	checkForUpdate,
	invokeToggleCheckUpdate,
	navigation,
}) => {
	const updateTranslation = useUpdateTranslation();

	useEffect(() => {
		updateTranslation();
		navigation.setParams({ title: T.t('settings') });
	}, [language]);

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			data-test-id="mainContainer">
			<SelectLanguage language={language} storeLanguage={storeLanguage} />
			<ToggleBox
				title={T.t('checkOfflineContentsUpdate')}
				value={checkForUpdate}
				onValueChange={invokeToggleCheckUpdate}
			/>
		</ScrollView>
	);
};

SettingsScreen.navigationOptions = ({ navigation }) => {
	return {
		title: navigation.getParam('title', 'Settings'),
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(128, 128, 128, 1)',
		},
	};
};

export default SettingsScreen;
