import { connect } from 'react-redux';

import IndexScreen from './component';
import { detectLanguage } from '../../actions/language';
import { detectCheckUpdate } from '../../actions/app-config';

const mapStateToProps = ({ config: { language } }) => {
	return { language };
};

const mapActoinToProps = {
	detectLanguage,
	detectCheckUpdate,
};

export { IndexScreen };

export default connect(mapStateToProps, mapActoinToProps)(IndexScreen);
