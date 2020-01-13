import { connect } from 'react-redux';

import c from './component';
import { getRoute, populateRoute } from '../../actions/routes';

const mapStateToProps = ({ config: { checkForUpdate }, route }) => {
	return { route, checkUpdateStatus: checkForUpdate };
};

const mapActoinToProps = { getRoute, populateRoute };

export default connect(mapStateToProps, mapActoinToProps)(c);
