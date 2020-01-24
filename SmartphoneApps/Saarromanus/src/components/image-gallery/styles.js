import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		backgroundColor: '#eee',
	},
	imageList: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: Math.floor(Dimensions.get('window').width),
	},
	imageContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '95%',
		borderRadius: 5,
		padding: 5,
		margin: 4,
		borderColor: '#e9ecf288',
		shadowColor: '#000000ff',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 1,
		elevation: 4,
		paddingBottom: 10,
	},
	image: {
		height: 150,
		width: '100%',
		borderRadius: 2,
		marginBottom: 5,
	},
	caption: {
		textAlign: 'center',
		fontWeight: '100',
		fontStyle: 'italic',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// flexBasis: '100%',
		flex: 1,
		backgroundColor: '#000',
	},
	imageFull: {
		width: '100%',
		height: '100%',
		width: Math.floor(Dimensions.get('window').width),
	},
});
