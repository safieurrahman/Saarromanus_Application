import React from 'react';
import { View } from 'react-native';

export default ({ value = 15, children }) => {
	return (
		<View
			style={{
				marginLeft: value,
			}}>
			{children}
		</View>
	);
};
