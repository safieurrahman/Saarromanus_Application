import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

try {
	enzyme.configure({ adapter: new Adapter() });
} catch (error) {
	console.log('error');
}
