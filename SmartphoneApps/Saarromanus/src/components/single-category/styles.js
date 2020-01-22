import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'center',
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
		alignItems: 'flex-start',
		justifyContent: 'center',
		flex: 1,
		marginTop: 10,
	},
	headingText: {
		fontSize: 30,
		fontWeight: 'bold',
	},
});
