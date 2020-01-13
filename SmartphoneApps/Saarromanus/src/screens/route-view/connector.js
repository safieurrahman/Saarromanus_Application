import { connect } from 'react-redux';

import c from './component';
import { getRoute, populateRoute } from '../../actions/routes';
import { showLoadingScreen, hideLoadingScreen } from '../../actions/app-config';

const mapStateToProps = ({ config: { checkForUpdate }, route }) => {
	return { route, checkUpdateStatus: checkForUpdate };
};

const mapActoinToProps = {
	getRoute,
	populateRoute,
	showLoadingScreen,
	hideLoadingScreen,
};

export default connect(mapStateToProps, mapActoinToProps)(c);
