export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const DETECT_LANGUAGE = 'DETECT_LANGUAGE';

export const changeLanguage = language => {
	return { type: CHANGE_LANGUAGE, payload: language };
};

export const detectLanguage = () => {
	return { type: DETECT_LANGUAGE };
};
