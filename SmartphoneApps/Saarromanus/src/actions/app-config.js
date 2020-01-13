export const INVOKE_TOGGLE_CHECK_UPDATE = 'INVOKE_TOGGLE_CHECK_UPDATE';
export const TOGGLE_CHECK_UPDATE = 'TOGGLE_CHECK_UPDATE';

export const invokeToggleCheckUpdate = () => {
	return { type: INVOKE_TOGGLE_CHECK_UPDATE };
};

export const toggleCheckUpdate = payload => {
	return { type: TOGGLE_CHECK_UPDATE, payload };
};
