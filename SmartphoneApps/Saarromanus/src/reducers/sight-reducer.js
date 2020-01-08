import { sight } from './inital-states';
import { POPULATE_SIGHT } from '../actions/sights';

export default (state = sight, action) => {
	if (action.type === POPULATE_SIGHT) {
		return action.payload;
	}
	return state;
};
