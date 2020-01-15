import { connect } from 'react-redux';

import c from './component';
import { getSight, populateSight } from '../../actions/sights';
import {
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
} from '../../actions/app-config';

const mapStateToProps = ({ config: { checkForUpdate }, sight }) => {
	return { sight, checkUpdateStatus: checkForUpdate };
};

const mapActoinToProps = {
	getSight,
	populateSight,
	showLoadingScreen,
	hideLoadingScreen,
	showAlert,
};

export default connect(mapStateToProps, mapActoinToProps)(c);
