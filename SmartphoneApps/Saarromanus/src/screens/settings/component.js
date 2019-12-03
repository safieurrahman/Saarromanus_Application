import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Entypo, AntDesign } from '@expo/vector-icons';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import LabelIcon from '../../components/helpers/label_with_icon';

import styles from './styles';

const SettingsScreen = ({}) => {
	// useEffect(() => {
	// }, []);

	return (
		<View style={styles.container}>
			<Card
				title={
					<LabelIcon
						iconEl={
							<Entypo
								name="language"
								size={30}
								color={'#000000'}
							/>
						}
						label={'Change Language'}
						labelFontSize={25}
						labelFontWeight={'bold'}
						separator
						center
					/>
				}>
				<View>
					<Button title="English" />
					<VerticalSeparator />
					<Button title="German" color="grey" />
				</View>
			</Card>
			<Card
				title={
					<LabelIcon
						iconEl={
							<AntDesign
								name="infocirlceo"
								size={25}
								color={'#008800'}
							/>
						}
						label={'App Guide'}
						labelFontSize={25}
						labelFontWeight={'bold'}
						separator
						center
					/>
				}>
				<View>
					<Text style={{ textAlign: 'justify' }}>
						Lorem ipsum, or lipsum as it is sometimes known, is
						dummy text used in laying out print, graphic or web
						designs. The passage is attributed to an unknown
						typesetter in the 15th century who is thought to have
						scrambled parts of Cicero's De Finibus Bonorum et
						Malorum for use in a type specimen book. Lorem ipsum, or
						lipsum as it is sometimes known, is dummy text used in
						laying out print, graphic or web designs. The passage is
						attributed to an unknown typesetter in the 15th century
						who is thought to have scrambled parts of Cicero's De
						Finibus Bonorum et Malorum for use in a type specimen
						book.
					</Text>
				</View>
			</Card>
		</View>
	);
};

SettingsScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Settings',
		headerTintColor: '#dddddd',
		headerStyle: {
			backgroundColor: 'rgba(128, 128, 128, 1)',
		},
	};
};

export default SettingsScreen;
