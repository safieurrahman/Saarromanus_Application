import { connect } from 'react-redux';

import IndexScreen from './component';
import { detectLanguage } from '../../actions/language';

const mapStateToProps = ({ config: { language } }) => {
	return { language };
};

const mapActoinToProps = {
	detectLanguage,
};

export default connect(mapStateToProps, mapActoinToProps)(IndexScreen);
