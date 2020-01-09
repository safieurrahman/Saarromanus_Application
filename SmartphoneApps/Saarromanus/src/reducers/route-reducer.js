import { route } from './inital-states';
import { POPULATE_ROUTE } from '../actions/routes';

export default (state = route, action) => {
	if (action.type === POPULATE_ROUTE) {
		return action.payload;
	}
	return state;
};
