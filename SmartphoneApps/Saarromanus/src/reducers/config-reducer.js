import { config } from './inital-states';
import { CHANGE_LANGUAGE } from '../actions/language';
import {
	TOGGLE_CHECK_UPDATE,
	SHOW_LOADING_SCREEN,
	HIDE_LOADING_SCREEN,
	SHOW_ALERT,
	HIDE_ALERT,
} from '../actions/app-config';

export default (state = config, action) => {
	if (action.type === CHANGE_LANGUAGE) {
		return { ...state, language: action.payload };
	} else if (action.type === TOGGLE_CHECK_UPDATE) {
		return { ...state, checkForUpdate: action.payload };
	} else if (action.type === SHOW_LOADING_SCREEN) {
		return { ...state, loading: true };
	} else if (action.type === HIDE_LOADING_SCREEN) {
		return { ...state, loading: false };
	} else if (action.type === SHOW_ALERT) {
		return {
			...state,
			alert: {
				show: true,
				title: action.payload.title,
				message: action.payload.message,
			},
		};
	} else if (action.type === HIDE_ALERT) {
		return {
			...state,
			alert: {
				show: false,
				title: '',
				message: '',
			},
		};
	}
	return state;
};
