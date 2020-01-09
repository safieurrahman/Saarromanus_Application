export const GET_SIGHT_CATEGORIES = 'GET_SIGHT_CATEGORIES';
export const POPULATE_SIGHT_CATEGORIES = 'POPULATE_SIGHT_CATEGORIES';
export const GET_SIGHTS_BY_CATEGORY = 'GET_SIGHTS_BY_CATEGORY';
export const POPULATE_SIGHTS_BY_CATEGORY = 'POPULATE_SIGHTS_BY_CATEGORY';
export const GET_SIGHT = 'GET_SIGHT';
export const POPULATE_SIGHT = 'POPULATE_SIGHT';

export const getSightCategories = () => ({ type: GET_SIGHT_CATEGORIES });

export const getSightsByCategory = payload => ({
	type: GET_SIGHTS_BY_CATEGORY,
	payload,
});

export const getSight = payload => ({
	type: GET_SIGHT,
	payload,
});

export const populateSightCategories = payload => ({
	type: POPULATE_SIGHT_CATEGORIES,
	payload,
});

export const populateSightsByCategory = payload => ({
	type: POPULATE_SIGHTS_BY_CATEGORY,
	payload,
});

export const populateSight = payload => ({
	type: POPULATE_SIGHT,
	payload,
});
