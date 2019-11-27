import { connect } from 'react-redux';

import IndexScreen from './index-screen';

const mapStateToProps = ({ test: { message } }) => {
	return { message };
};

const mapActoinToProps = {
	updateScreen: () => ({ type: 'US' }),
};

export default connect(mapStateToProps, mapActoinToProps)(IndexScreen);
