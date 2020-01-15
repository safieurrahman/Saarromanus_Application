import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginBottom: 20,
	},
	headingContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		width: '90%',
	},
	headingText: {
		fontSize: 22,
		fontWeight: 'bold',
	},
	detailsText: {
		paddingHorizontal: 20,
		textAlign: 'justify',
	},
});
