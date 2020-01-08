export const GET_ROUTE_LIST = 'GET_ROUTE_LIST';
export const GET_ROUTE = 'GET_ROUTE';
export const POPULATE_ROUTE_LIST = 'POPULATE_ROUTE_LIST';
export const POPULATE_ROUTE = 'POPULATE_ROUTE';

export const getRouteList = () => ({ type: GET_ROUTE_LIST });

export const getRoute = payload => ({ type: GET_ROUTE, payload });

export const populateRouteList = payload => ({
	type: POPULATE_ROUTE_LIST,
	payload,
});
export const populateRoute = payload => ({
	type: POPULATE_ROUTE,
	payload,
});
