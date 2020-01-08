import { sightCategories } from './inital-states';
import { POPULATE_SIGHT_CATEGORIES } from '../actions/sights';

export default (state = sightCategories, action) => {
	if (action.type === POPULATE_SIGHT_CATEGORIES) {
		return action.payload;
	}
	return state;
};
