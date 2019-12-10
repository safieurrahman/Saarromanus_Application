import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import T from '../../utils/translator';

import styles from './styles';

const SingleCategory = ({ navigation, iconName, categoryName }) => {
	return (
		// <View>
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigation.navigate('SightsList')}>
			<View style={styles.iconContainer}>
				<MaterialIcons name={iconName} size={60} />
			</View>
			<View>
				<Text style={styles.headingText}>{categoryName}</Text>
				{/* <View> */}
				<Text>Category Details</Text>
				{/* </View> */}
			</View>
		</TouchableOpacity>
		// </View>
	);
};

export default withNavigation(SingleCategory);
