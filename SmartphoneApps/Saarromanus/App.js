import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import store from './src/store/';

const Screen = ({ message, updateScreen }) => {
	useEffect(() => {
		updateScreen();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			{message ? <Text>{message}</Text> : null}
		</View>
	);
};

const App = connect(
	({ test: { message } }) => {
		return { message };
	},
	{
		updateScreen: () => ({ type: 'US' }),
	}
)(Screen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}
