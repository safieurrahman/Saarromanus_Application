import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	// Main container
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
	},

	// Cover photo and logo section
	coverContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexBasis: '40%',
	},
	logoContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	logo: {
		width: 250,
		height: 250,
	},

	// Main options section
	mainOptionsContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		flex: 1,
	},
	optionLabelContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	optionLabel: {
		fontSize: 40,
		color: '#FFF',
		fontWeight: 'bold',
	},

	// Navigation Bar
	icon: {
		marginRight: 10,
	},
});
