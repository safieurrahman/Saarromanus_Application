import axios from 'axios';

export default axios.create({
	baseURL: ' http://94cc05f4.ngrok.io',
	// timeout: 1000,
	// headers: {'X-Custom-Header': 'foobar'},
});
