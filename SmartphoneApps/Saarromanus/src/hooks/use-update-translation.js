import { useState } from 'react';

export default () => {
	const [, update] = useState();
	return () => update({});
};
