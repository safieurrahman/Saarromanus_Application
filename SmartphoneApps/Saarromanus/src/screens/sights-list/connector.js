import { connect } from 'react-redux';

import c from './component';
import { getSightsByCategory } from '../../actions/sights';

const mapStateToProps = ({ sights }) => {
	return { sights };
};

const mapActoinToProps = { getSightsByCategory };

export default connect(mapStateToProps, mapActoinToProps)(c);
