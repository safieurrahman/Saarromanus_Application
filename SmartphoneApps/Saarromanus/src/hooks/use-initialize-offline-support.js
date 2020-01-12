import {
	SIGHT_TABLE,
	SIGHT_CATEGORIES_TABLE,
	ROUTE_TABLE,
	ROUTE_LIST_TABLE,
	createTable,
} from './use-download-contents';

export default () => {
	createTable(SIGHT_TABLE);
	createTable(SIGHT_CATEGORIES_TABLE);
	createTable(ROUTE_TABLE);
	createTable(ROUTE_LIST_TABLE);
};
