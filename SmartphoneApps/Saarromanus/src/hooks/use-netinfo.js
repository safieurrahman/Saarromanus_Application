import NetInfo from '@react-native-community/netinfo';

export default setConnectionStatus => {
	NetInfo.fetch().then(state => {
		setConnectionStatus(state.isConnected);
	});
};
