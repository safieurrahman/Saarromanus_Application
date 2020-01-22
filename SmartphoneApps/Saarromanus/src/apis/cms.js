import axios from 'axios';

export default axios.create({
	baseURL: 'https://us-central1-saarromanus.cloudfunctions.net/webApi/api/v1',
	// timeout: 1000,
	// headers: {'X-Custom-Header': 'foobar'},
});
