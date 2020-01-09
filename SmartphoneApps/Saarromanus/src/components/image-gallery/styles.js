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
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		margin: 5,
	},
	image: {
		height: 150,
		width: '100%',
		borderRadius: 2,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexBasis: '100%',
	},
	imageFull: {
		width: '100%',
		height: '100%',
		width: Math.floor(Dimensions.get('window').width),
	},
});
