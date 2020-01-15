import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import VerticalSeparator from '../helpers/vertical-separator';

import T from '../../utils/translator';

import styles from './styles';

const TextBox = ({ heading, text }) => {
	return (
		<View style={styles.container}>
			{heading && (
				<View style={styles.headingContainer}>
					<Text
						style={styles.headingText}
						ellipsizeMode={'tail'}
						numberOfLines={1}>
						{heading}
					</Text>
					<VerticalSeparator marginVertical={5} />
				</View>
			)}
			<Text style={styles.detailsText}>{text}</Text>
		</View>
	);
};

export default TextBox;
