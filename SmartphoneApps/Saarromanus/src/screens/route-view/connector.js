import { connect } from 'react-redux';

import c from './component';
import { getRoute, populateRoute } from '../../actions/routes';

const mapStateToProps = ({ route }) => {
	return { route };
};

const mapActoinToProps = { getRoute, populateRoute };

export default connect(mapStateToProps, mapActoinToProps)(c);
