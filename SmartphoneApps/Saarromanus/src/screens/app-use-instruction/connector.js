import { connect } from 'react-redux';

import c from './component';
import { getAppUseInstruction } from '../../actions/app-config';

const mapStateToProps = ({ instruction }) => {
	return { instruction };
};

const mapActoinToProps = { getAppUseInstruction };

export default connect(mapStateToProps, mapActoinToProps)(c);
