import { connect } from 'react-redux';

import c from './component';
import { getRoute, populateRoute } from '../../actions/routes';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../../actions/app-config';

const mapStateToProps = ({ config: { checkForUpdate }, route }) => {
	return { route, checkUpdateStatus: checkForUpdate };
};

const mapActoinToProps = {
	getRoute,
	populateRoute,
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
};

export default connect(mapStateToProps, mapActoinToProps)(c);
