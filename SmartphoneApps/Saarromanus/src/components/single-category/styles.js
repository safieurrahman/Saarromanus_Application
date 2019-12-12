import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'row',
		// justifyContent: '',
		width: '100%',
		flex: 1,
		paddingVertical: 25,
		paddingHorizontal: 15,
	},
	iconContainer: {
		flexBasis: '30%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headingText: {
		fontSize: 30,
		fontWeight: 'bold',
	},
});
