import { config } from './inital-states';
import { CHANGE_LANGUAGE } from '../actions/language';
import {
	TOGGLE_CHECK_UPDATE,
	SHOW_LOADING_SCREEN,
	HIDE_LOADING_SCREEN,
} from '../actions/app-config';

export default (state = config, action) => {
	if (action.type === CHANGE_LANGUAGE) {
		return { ...config, language: action.payload };
	} else if (action.type === TOGGLE_CHECK_UPDATE) {
		return { ...config, checkForUpdate: action.payload };
	} else if (action.type === SHOW_LOADING_SCREEN) {
		return { ...config, loading: true };
	} else if (action.type === HIDE_LOADING_SCREEN) {
		return { ...config, loading: false };
	}
	return state;
};
