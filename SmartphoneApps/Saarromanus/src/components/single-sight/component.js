import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import T from '../../utils/translator';

import styles from './styles';

const SingleSight = ({ thumbnail, name, description }) => {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={thumbnail} style={styles.image} />
			</View>
			<View>
				<Text style={styles.headingText}>{name}</Text>
				<Text>{description}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SingleSight;
