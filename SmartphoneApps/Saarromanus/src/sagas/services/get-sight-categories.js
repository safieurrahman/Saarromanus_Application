import cms from '../../apis/cms';

export default async () => {
	const response = await cms.get('/sight_categories');
	return response.data;
};
