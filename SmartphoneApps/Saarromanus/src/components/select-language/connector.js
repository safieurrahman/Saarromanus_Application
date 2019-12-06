import { connect } from 'react-redux';

import SettingsScreen from './component';

import { storeLanguage } from '../../actions/language';

const mapStateToProps = ({ config: { language } }) => {
	return { language };
};

const mapActoinToProps = { storeLanguage };

export default connect(mapStateToProps, mapActoinToProps)(SettingsScreen);
