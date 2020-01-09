import { connect } from 'react-redux';

import c from './component';
import { getRouteList } from '../../actions/routes';

const mapStateToProps = ({ routes }) => {
	return { routes };
};

const mapActoinToProps = { getRouteList };

export default connect(mapStateToProps, mapActoinToProps)(c);
