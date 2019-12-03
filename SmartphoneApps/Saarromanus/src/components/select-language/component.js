import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Entypo, AntDesign } from '@expo/vector-icons';

import VerticalSeparator from '../../components/helpers/vertical-separator';
import LabelIcon from '../../components/helpers/label_with_icon';

import styles from './styles';

const SelectLanguage = ({ selectedLanguage }) => {
	// useEffect(() => {
	// }, []);

	return (
		<Card
			title={
				<LabelIcon
					iconEl={
						<Entypo name="language" size={30} color={'#000000'} />
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
	);
};

export default SelectLanguage;
