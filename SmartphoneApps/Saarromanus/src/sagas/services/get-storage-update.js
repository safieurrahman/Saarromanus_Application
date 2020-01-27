import { AsyncStorage } from 'react-native';

export default async () => {
	try {
		const checkForUpdate = await AsyncStorage.getItem(
			'SAARROMANUS:CONFIG:CHECK_FOR_UPDATE'
		);
		return {
			success: true,
			payload: checkForUpdate === 'true',
		};
	} catch (error) {
		// console.log(error);
	}
};
