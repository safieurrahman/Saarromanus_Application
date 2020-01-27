import { AsyncStorage } from 'react-native';

export default async language => {
	try {
		await AsyncStorage.setItem('SAARROMANUS:CONFIG:LANGUAGE', language);
	} catch (error) {
		// console.log(error);
	}
};
