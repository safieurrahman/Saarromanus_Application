import cms from '../../apis/cms';

export default async sightId => {
	const response = await cms.get(`/instruction_manual`);
	return response.data;
};
