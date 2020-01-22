import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'row',
		// justifyContent: '',
		width: '100%',
		paddingVertical: 25,
		paddingHorizontal: 15,
	},
	iconContainer: {
		flexBasis: '30%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headingContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// height: '100%',
	},
	headingText: {
		fontSize: 40,
		fontWeight: 'bold',
	},
});
