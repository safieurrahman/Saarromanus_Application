export const DETECT_CHECK_UPDATE = 'DETECT_CHECK_UPDATE';
export const INVOKE_TOGGLE_CHECK_UPDATE = 'INVOKE_TOGGLE_CHECK_UPDATE';
export const TOGGLE_CHECK_UPDATE = 'TOGGLE_CHECK_UPDATE';
export const SHOW_LOADING_SCREEN = 'SHOW_LOADING_SCREEN';
export const HIDE_LOADING_SCREEN = 'HIDE_LOADING_SCREEN';
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export const detectCheckUpdate = () => {
	return { type: DETECT_CHECK_UPDATE };
};

export const invokeToggleCheckUpdate = payload => {
	return { type: INVOKE_TOGGLE_CHECK_UPDATE, payload };
};

export const toggleCheckUpdate = payload => {
	return { type: TOGGLE_CHECK_UPDATE, payload };
};

export const showLoadingScreen = () => {
	return { type: SHOW_LOADING_SCREEN };
};

export const hideLoadingScreen = () => {
	return { type: HIDE_LOADING_SCREEN };
};

export const hideAlert = () => {
	return { type: HIDE_ALERT };
};

export const showAlert = payload => {
	return { type: SHOW_ALERT, payload };
};
