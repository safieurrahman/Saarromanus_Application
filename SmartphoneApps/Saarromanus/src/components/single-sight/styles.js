import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		flex: 1,
		paddingVertical: 10,
	},
	imageContainer: {
		flexBasis: '30%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 5,
	},
	image: {
		width: 100,
		height: 80,
		borderRadius: 5,
	},
	headingText: {
		fontSize: 30,
		fontWeight: 'bold',
	},
});
