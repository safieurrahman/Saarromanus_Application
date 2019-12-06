import { config } from './inital-states';
import { CHANGE_LANGUAGE } from '../actions/language';

export default (state = config, action) => {
	if (action.type === CHANGE_LANGUAGE) {
		return { ...config, language: action.payload };
	}
	return state;
};
