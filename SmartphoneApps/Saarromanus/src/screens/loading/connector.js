import { connect } from 'react-redux';

import c from './component';

const mapStateToProps = ({ config: { loading } }) => {
	return { loading };
};

const mapActoinToProps = {};

export default connect(mapStateToProps, mapActoinToProps)(c);
