import cms from '../../apis/cms';

export default async sightId => {
	const response = await cms.get(`/sights/${sightId}`);
	return response.data;
};
