import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
	// Main container
	container: {
		// display: 'flex',
		// width: '100%',
		// height: Math.floor(Dimensions.get('window').height),
		flex: 1, // TODO: s8karabi : Change it later
	},

	// Cover photo and logo section
	coverContainer: {
		display: 'flex',
		alignItems: 'stretch',
		justifyContent: 'center',
		flexBasis: '40%',
		flex: 1,
	},
	logoContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	logo: {
		width: 250,
		height: 250,
	},

	// Main options section
	mainOptionsContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'stretch',
		flexBasis: '50%',
	},
	singleOptionContainer: {
		flexBasis: '33%',
		display: 'flex',
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	optionLabelContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	optionLabel: {
		fontSize: 35,
		color: '#FFF',
		fontWeight: 'bold',
	},

	// Navigation Bar
	icon: {
		marginRight: 10,
	},
});
