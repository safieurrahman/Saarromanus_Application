import { connect } from 'react-redux';

import c from './component';

const mapStateToProps = ({ config: { language, loading } }) => {
	return { language, loading };
};

const mapActoinToProps = {};

export default connect(mapStateToProps, mapActoinToProps)(c);
