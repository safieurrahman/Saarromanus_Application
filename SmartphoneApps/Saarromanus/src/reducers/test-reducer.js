export default (state = { message: '' }, action) => {
	if (action.type === 'AM') {
		return { message: 'New message through redux-saga' };
	}
	return state;
};
