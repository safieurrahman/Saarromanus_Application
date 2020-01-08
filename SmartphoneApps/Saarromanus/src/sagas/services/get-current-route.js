import cms from '../../apis/cms';

export default async id => {
	const response = await cms.get(`/routes/${id}`);
	return response.data;
};
