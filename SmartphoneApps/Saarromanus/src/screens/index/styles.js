import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
	// Main container
	// maxHeight: Math.floor((Dimensions.get('window').height * 40) / 100),

	container: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	logoContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: '40%',
		minHeight: '40%',
		width: '100%',
	},
	logo: {
		width: 200,
		height: 200,
	},

	// Main options section
	mainOptionsContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 2,
		flexShrink: 1,
		flexBasis: '60%',
		minHeight: '60%',
		width: '100%',
	},
	singleOptionContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexBasis: '33%',
		width: '100%',
	},
	optionLabelContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		width: '100%',
		height: '100%',
	},
	optionLabel: {
		fontSize: 30,
		color: '#FFF',
		fontWeight: 'bold',
		textAlign: 'center',
	},

	// Navigation Bar
	icon: {
		marginRight: 10,
	},
});
