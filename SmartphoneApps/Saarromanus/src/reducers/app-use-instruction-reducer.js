import { instruction } from './inital-states';
import { POPULATE_APP_USE_INSTRUCTION } from '../actions/app-config';

export default (state = instruction, action) => {
	if (action.type === POPULATE_APP_USE_INSTRUCTION) {
		return action.payload;
	}
	return state;
};
