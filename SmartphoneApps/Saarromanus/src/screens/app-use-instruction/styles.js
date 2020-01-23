import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	// Main container
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		flexGrow: 1,
		paddingVertical: 5,
	},
	view: {
		display: 'flex',
		width: '98%',
		paddingTop: 15,
		borderColor: '#e9ecf288',
		shadowColor: '#000000ff',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 2,
		paddingBottom: 15,
		paddingHorizontal: 10,
	},
	label: {
		textAlign: 'justify',
	},
});
