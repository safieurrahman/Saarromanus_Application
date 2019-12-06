import { connect } from 'react-redux';

import AppGuide from './component';

const mapStateToProps = ({ config: { language } }) => {
	return { language };
};

const mapActoinToProps = {};

export default connect(mapStateToProps, mapActoinToProps)(AppGuide);
