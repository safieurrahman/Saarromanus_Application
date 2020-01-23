import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		flexGrow: 1,
	},
	innerContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	textContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		padding: 20,
		textAlign: 'center',
	},
	headingText: {
		fontSize: 35,
		fontWeight: 'bold',
	},
	separator: {
		alignSelf: 'flex-end',
	},
});
