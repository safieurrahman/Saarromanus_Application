import axios from 'axios';

export default axios.create({
	baseURL: 'http://2211c318.ngrok.io',
	// timeout: 1000,
	// headers: {'X-Custom-Header': 'foobar'},
});
