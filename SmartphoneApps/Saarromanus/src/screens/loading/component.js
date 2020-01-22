import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingScreen = ({ loading }) => {
	return (
		loading && (
			<View style={styles.container}>
				<Image
					source={require('../../../assets/loader.gif')}
					style={{ width: 150, height: 150 }}
					resizeMode="contain"
				/>
				<Image
					source={require('../../../assets/loading.gif')}
					style={{ width: 300, height: 150 }}
				/>
				<ActivityIndicator size={'large'} color={'#e3703b'} />
			</View>
		)
	);
};

export default LoadingScreen;
