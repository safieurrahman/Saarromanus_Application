import { config } from './inital-states';
import { CHANGE_LANGUAGE } from '../actions/language';
import { TOGGLE_CHECK_UPDATE } from '../actions/app-config';

export default (state = config, action) => {
	if (action.type === CHANGE_LANGUAGE) {
		return { ...config, language: action.payload };
	} else if (action.type === TOGGLE_CHECK_UPDATE) {
		return { ...config, checForUpdate: action.payload };
	}
	return state;
};
