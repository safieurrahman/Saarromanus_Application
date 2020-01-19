import { connect } from 'react-redux';

import SettingsScreen from './component';
import { storeLanguage } from '../../actions/language';
import { invokeToggleCheckUpdate } from '../../actions/app-config';

const mapStateToProps = ({ config: { language, checkForUpdate } }) => {
	return { language, checkForUpdate };
};

const mapActoinToProps = { invokeToggleCheckUpdate, storeLanguage };

export default connect(mapStateToProps, mapActoinToProps)(SettingsScreen);
