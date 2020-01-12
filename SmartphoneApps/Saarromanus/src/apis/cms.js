import axios from 'axios';

export default axios.create({
	baseURL: 'http://df0d33a8.ngrok.io',
	// timeout: 1000,
	// headers: {'X-Custom-Header': 'foobar'},
});
