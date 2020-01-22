import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingVertical: 10,
	},
	imageContainer: {
		flexBasis: '30%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 5,
		alignSelf: 'flex-start',
	},
	image: {
		width: 90,
		height: 70,
		borderRadius: 5,
	},
	textGroup: {
		flexBasis: '70%',
	},
	headingText: {
		fontSize: 25,
		fontWeight: 'bold',
	},
});
