import { connect } from 'react-redux';

import c from './component';
import { getRouteList, populateRouteList } from '../../actions/routes';

const mapStateToProps = ({ config: { language, checkForUpdate }, routes }) => {
	return { routes, language, checkUpdateStatus: checkForUpdate };
};

const mapActoinToProps = { getRouteList, populateRouteList };

export default connect(mapStateToProps, mapActoinToProps)(c);
