import { routes } from './inital-states';
import { POPULATE_ROUTE_LIST } from '../actions/routes';

export default (state = routes, action) => {
	if (action.type === POPULATE_ROUTE_LIST) {
		return action.payload;
	}
	return state;
};
