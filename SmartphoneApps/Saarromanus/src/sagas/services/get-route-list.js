import cms from '../../apis/cms';

export default async () => {
	const response = await cms.get('/routes');
	return response.data;
};
