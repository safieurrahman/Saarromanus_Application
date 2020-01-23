import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	view: {
		display: 'flex',
		width: '93%',
		flex: 1,
		borderColor: '#e9ecf2',
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 2,
	},
	contentContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 200,
	},
	optionsContainer: {
		width: '100%',
		marginBottom: 1,
		flex: 1,
	},
});
