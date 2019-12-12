import { connect } from 'react-redux';

import SettingsScreen from './component';

const mapStateToProps = ({ config: { language } }) => {
	return { language };
};

const mapActoinToProps = {};

export default connect(mapStateToProps, mapActoinToProps)(SettingsScreen);
