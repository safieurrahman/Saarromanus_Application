import React from 'react';
import { View } from 'react-native';

export default ({ marginVertical = 1 }) => {
	return (
		<View
			style={{
				borderBottomColor: '#eee',
				borderBottomWidth: 1,
				alignSelf: 'stretch',
				marginVertical,
			}}
		/>
	);
};
