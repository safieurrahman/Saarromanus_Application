import { connect } from 'react-redux';

import c from './component';
import { getRoute } from '../../actions/routes';

const mapStateToProps = ({ route }) => {
	return { route };
};

const mapActoinToProps = { getRoute };

export default connect(mapStateToProps, mapActoinToProps)(c);
