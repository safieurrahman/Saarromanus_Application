import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingScreen = ({ loading }) => {
	return (
		loading && (
			<View style={styles.container}>
				<ActivityIndicator size={'large'} color={'#e3703b'} />
				<Image
					source={require('../../../assets/loading.gif')}
					style={{ width: 300, height: 150 }}
				/>
			</View>
		)
	);
};

export default LoadingScreen;
