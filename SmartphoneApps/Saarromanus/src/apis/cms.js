import axios from 'axios';

export default axios.create({
	baseURL: 'http://5e561cf5.ngrok.io',
	// timeout: 1000,
	// headers: {'X-Custom-Header': 'foobar'},
});
