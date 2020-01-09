// import { useState } from 'react';
import T from '../utils/translator';

export default () => {
	return T.currentLocale().substring(0, 2);
};
