import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '95%',
		borderWidth: 2,
		borderRadius: 10,
		padding: 10,
		margin: 5,
		backgroundColor: '#fff',
	},
	text: {
		fontSize: 20,
		flexBasis: '80%',
	},
});
