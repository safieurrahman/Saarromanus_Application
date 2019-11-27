import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
	},
	coverContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '40%',
	},
	logoContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		// opacity: 0.5,
	},
	label: {
		fontSize: 20,
		marginTop: 15,
		paddingHorizontal: 15,
	},
	image: {
		width: 200,
		height: 200,
	},
});
