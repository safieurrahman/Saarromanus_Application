import axios from 'axios';

export default axios.create({
	baseURL: 'http://32551834.ngrok.io',
	// timeout: 1000,
	// headers: {'X-Custom-Header': 'foobar'},
});
