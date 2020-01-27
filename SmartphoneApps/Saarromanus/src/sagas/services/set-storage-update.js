import { AsyncStorage } from 'react-native';

export default async checkForUpdate => {
	try {
		await AsyncStorage.setItem(
			'SAARROMANUS:CONFIG:CHECK_FOR_UPDATE',
			checkForUpdate.toString()
		);
	} catch (error) {
		// console.log(error);
	}
};
