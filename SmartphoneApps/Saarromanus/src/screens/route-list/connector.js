import { connect } from 'react-redux';

import c from './component';
import { getRouteList, populateRouteList } from '../../actions/routes';

const mapStateToProps = ({ routes }) => {
	return { routes };
};

const mapActoinToProps = { getRouteList, populateRouteList };

export default connect(mapStateToProps, mapActoinToProps)(c);
