import * as sqlite from 'expo-sqlite';

export const config = {
	language: 'en-US',
};

export const routes = [];
export const route = {};

export const DB = sqlite.openDatabase('test-db', '0.1');
