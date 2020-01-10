import { sights } from './inital-states';
import { POPULATE_SIGHTS_BY_CATEGORY } from '../actions/sights';

export default (state = sights, action) => {
	if (action.type === POPULATE_SIGHTS_BY_CATEGORY) {
		return action.payload ? action.payload : [];
	}
	return state;
};
