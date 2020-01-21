import React from 'react';
import { View, Text, Switch } from 'react-native';

import VerticalSeparator from '../helpers/vertical-separator';

import T from '../../utils/translator';

import styles from './styles';

const ToggleBox = ({ title, value, onValueChange }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.titleText} numberOfLines={1}>
				{title}
			</Text>
			<Switch value={value} onValueChange={onValueChange} />
		</View>
	);
};

export default ToggleBox;
