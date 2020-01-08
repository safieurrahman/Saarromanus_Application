import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './styles';

const SingleSight = ({ id, name, description, thumbnail, navigation }) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() =>
				navigation.navigate('SightDetails', { sightId: id })
			}>
			<View style={styles.imageContainer}>
				<Image
					source={{
						uri: thumbnail,
					}}
					style={styles.image}
				/>
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
