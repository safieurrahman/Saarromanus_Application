import { connect } from 'react-redux';

import c from './component';
import { getSight } from '../../actions/sights';

const mapStateToProps = ({ sight }) => {
	return { sight };
};

const mapActoinToProps = { getSight };

export default connect(mapStateToProps, mapActoinToProps)(c);
