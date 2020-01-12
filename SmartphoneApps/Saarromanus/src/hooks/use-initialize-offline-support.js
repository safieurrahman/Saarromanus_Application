import {
	SIGHT_TABLE,
	SIGHT_CATEGORIES_TABLE,
	SIGHTS_BY_CATEGORY_TABLE,
	SIGHT_LIST_TABLE,
	ROUTE_TABLE,
	ROUTE_LIST_TABLE,
	createTable,
} from './use-download-contents';

export default () => {
	createTable(SIGHT_TABLE);
	createTable(SIGHT_CATEGORIES_TABLE);
	createTable(SIGHTS_BY_CATEGORY_TABLE);
	// createTable(SIGHT_LIST_TABLE);
	createTable(ROUTE_TABLE);
	createTable(ROUTE_LIST_TABLE);
};
