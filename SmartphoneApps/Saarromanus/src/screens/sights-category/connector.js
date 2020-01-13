import { connect } from 'react-redux';

import c from './component';
import {
	getSightCategories,
	populateSightCategories,
} from '../../actions/sights';

const mapStateToProps = ({ config: { checkForUpdate }, sightCategories }) => {
	return { sightCategories, checkUpdateStatus: checkForUpdate };
};

const mapActoinToProps = { getSightCategories, populateSightCategories };

export default connect(mapStateToProps, mapActoinToProps)(c);
