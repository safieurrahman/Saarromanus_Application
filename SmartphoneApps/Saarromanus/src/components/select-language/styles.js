import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	view: {
		display: 'flex',
		width: '100%',
		flexBasis: '40%',
		flex: 1,
	},
	card: {
		display: 'flex',
		height: '100%',
		marginVertical: 0,
		paddingVertical: 0,
	},
	contentContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '80%',
		marginVertical: 0,
		paddingVertical: 0,
	},
	optionsContainer: {
		width: '100%',
		marginBottom: 1,
		flex: 1,
	},
});
