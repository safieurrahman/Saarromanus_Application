import cms from '../../apis/cms';

export default async categoryId => {
	const response = await cms.get(`/sight_categories/${categoryId}`);
	return response.data;
};
