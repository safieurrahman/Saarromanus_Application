import { connect } from 'react-redux';

import c from './component';
import {
	getSightCategories,
	populateSightCategories,
} from '../../actions/sights';

const mapStateToProps = ({ sightCategories }) => {
	return { sightCategories };
};

const mapActoinToProps = { getSightCategories, populateSightCategories };

export default connect(mapStateToProps, mapActoinToProps)(c);
