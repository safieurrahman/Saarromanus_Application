import React, { useEffect } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	Image,
	ActivityIndicator,
} from 'react-native';

import T from '../../utils/translator';
import useUpdateTranslation from '../../hooks/use-update-translation';

import styles from './styles';

const LoadingScreen = ({ language, loading }) => {
	const updateTranslation = useUpdateTranslation();

	useEffect(() => {
		T.locale = language;
		updateTranslation();
	}, [language]);

	console.log(loading);

	return (
		loading && (
			<View style={styles.container}>
				{/* <ActivityIndicator size={'large'} color={'red'} /> */}
				<Image
					source={require('../../../assets/loader.gif')}
					style={{ width: 100, height: 100 }}
				/>
				<Image
					source={require('../../../assets/loading.gif')}
					style={{ width: 300, height: 150 }}
				/>
			</View>
		)
	);
};

export default LoadingScreen;
