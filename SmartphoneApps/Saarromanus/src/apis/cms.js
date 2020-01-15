import axios from 'axios';

export default axios.create({
	baseURL: 'http://a1715a14.ngrok.io',
	// timeout: 1000,
	// headers: {'X-Custom-Header': 'foobar'},
});
