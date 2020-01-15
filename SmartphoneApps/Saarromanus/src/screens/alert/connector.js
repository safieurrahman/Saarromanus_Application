import { connect } from 'react-redux';

import c from './component';

import { hideAlert } from '../../actions/app-config';

const mapStateToProps = ({ config: { alert } }) => {
	return { alert };
};

const mapActoinToProps = { hideAlert };

export default connect(mapStateToProps, mapActoinToProps)(c);
