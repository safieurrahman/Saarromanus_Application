import { connect } from 'react-redux';

import c from './component';
import { getSight, populateSight } from '../../actions/sights';

const mapStateToProps = ({ sight }) => {
	return { sight };
};

const mapActoinToProps = { getSight, populateSight };

export default connect(mapStateToProps, mapActoinToProps)(c);
