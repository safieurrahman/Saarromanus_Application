import { connect } from 'react-redux';

import c from './component';
import {
	getSightsByCategory,
	populateSightsByCategory,
} from '../../actions/sights';

const mapStateToProps = ({ config: { checkForUpdate }, sights }) => {
	return { sights, checkUpdateStatus: checkForUpdate };
};

const mapActoinToProps = { getSightsByCategory, populateSightsByCategory };

export default connect(mapStateToProps, mapActoinToProps)(c);
