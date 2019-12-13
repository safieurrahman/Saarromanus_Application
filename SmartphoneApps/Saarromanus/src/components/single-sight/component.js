import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import T from '../../utils/translator';

import styles from './styles';

const SingleSight = ({ thumbnail, name, description, navigation }) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigation.navigate('SightDetails')}>
			<View style={styles.imageContainer}>
				<Image source={thumbnail} style={styles.image} />
			</View>
			<View style={styles.textGroup}>
				<Text numberOfLines={1} style={styles.headingText}>
					{name}
				</Text>
				<Text>{description}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default withNavigation(SingleSight);
