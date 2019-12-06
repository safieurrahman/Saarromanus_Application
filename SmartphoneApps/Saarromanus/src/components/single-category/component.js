import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import T from '../../utils/translator';

import styles from './styles';

const SingleCategory = ({ iconName, categoryName }) => {
	return (
		// <View>
		<TouchableOpacity style={styles.container}>
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

export default SingleCategory;
