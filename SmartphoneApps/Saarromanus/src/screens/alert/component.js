import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';

import styles from './styles';

const AlertScreen = ({ alert, hideAlert }) => {
	useEffect(() => {
		if (alert.show) {
			Alert.alert(
				alert.title,
				alert.message,
				[{ text: 'OK', onPress: hideAlert }],
				{ cancelable: false }
			);
		}
	}, [alert.show]);

	return null;
};

export default AlertScreen;
