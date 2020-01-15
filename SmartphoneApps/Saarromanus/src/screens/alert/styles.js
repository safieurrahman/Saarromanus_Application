import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		backgroundColor: '#fff8',
	},
});
