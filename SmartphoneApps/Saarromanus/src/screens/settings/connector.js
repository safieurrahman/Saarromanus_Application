import { connect } from 'react-redux';

import SettingsScreen from './component';
import { invokeToggleCheckUpdate } from '../../actions/app-config';

const mapStateToProps = ({ config: { language, checkForUpdate } }) => {
	return { language, checkForUpdate };
};

const mapActoinToProps = { invokeToggleCheckUpdate };

export default connect(mapStateToProps, mapActoinToProps)(SettingsScreen);
