import { connect } from 'react-redux';

import c from './component';
import { getSightCategories } from '../../actions/sights';

const mapStateToProps = ({ sightCategories }) => {
	return { sightCategories };
};

const mapActoinToProps = { getSightCategories };

export default connect(mapStateToProps, mapActoinToProps)(c);
