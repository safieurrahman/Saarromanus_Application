import { connect } from 'react-redux';

import c from './component';
import { getAppUseInstruction } from '../../actions/app-config';

const mapStateToProps = ({ config: { language } }) => {
	return { language };
};

const mapActoinToProps = { getAppUseInstruction };

export default connect(mapStateToProps, mapActoinToProps)(c);
