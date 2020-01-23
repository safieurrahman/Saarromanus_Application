import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	view: {
		display: 'flex',
		width: '93%',
		paddingTop: 15,
		borderColor: '#e9ecf288',
		shadowColor: '#000000ff',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 2,
		paddingBottom: 2,
	},
	contentContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 220,
	},
	optionsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginBottom: 1,
	},
});
