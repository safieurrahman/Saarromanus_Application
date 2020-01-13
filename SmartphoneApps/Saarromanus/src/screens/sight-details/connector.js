import { connect } from 'react-redux';

import c from './component';
import { getSight, populateSight } from '../../actions/sights';

const mapStateToProps = ({ config: { checkForUpdate }, sight }) => {
	return { sight, checkUpdateStatus: checkForUpdate };
};

const mapActoinToProps = { getSight, populateSight };

export default connect(mapStateToProps, mapActoinToProps)(c);
