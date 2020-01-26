import * as sqlite from 'expo-sqlite';

export const DB = sqlite.openDatabase('test-db', '0.1');

export const config = {
	language: 'en-US',
	checForUpdate: true,
	loading: false,
	alert: { show: false, title: '', message: '' },
};

export const instruction = {
	de: { content: '' },
	en: { content: '' },
	fr: { content: '' },
};

export const routes = [];
export const route = {};

export const sightCategories = [];

export const sights = [];
export const sight = {};
