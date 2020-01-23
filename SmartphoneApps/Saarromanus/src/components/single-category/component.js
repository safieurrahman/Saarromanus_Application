import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import T from '../../utils/translator';

import styles from './styles';

const SingleCategory = ({ id, iconName, categoryName, navigation }) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() =>
				navigation.navigate('SightsList', {
					categoryId: id,
					categoryName,
				})
			}>
			<View style={styles.iconContainer}>
				<MaterialIcons name={iconName} size={60} />
			</View>
			<View style={styles.headingContainer}>
				<Text style={styles.headingText} numberOfLines={1}>
					{categoryName}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default withNavigation(SingleCategory);
