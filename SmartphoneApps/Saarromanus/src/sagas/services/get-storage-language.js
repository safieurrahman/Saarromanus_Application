import { AsyncStorage } from 'react-native';

export default async () => {
	try {
		const language = await AsyncStorage.getItem(
			'SAARROMANUS:CONFIG:LANGUAGE'
		);
		return {
			success: true,
			payload: language,
		};
	} catch (error) {
		// console.log(error);
	}
};
