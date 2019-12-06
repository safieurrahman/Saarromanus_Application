import i18n from 'i18n-js';

import en from './locales/en';
import de from './locales/de';

i18n.fallbacks = true;
i18n.translations = {
	en,
	de,
};

export default i18n;
