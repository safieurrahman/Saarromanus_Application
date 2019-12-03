import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

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
					label="Change Language"
					labelFontSize={25}
					labelFontWeight="bold"
					separator
					center
				/>
			}>
			<View>
				{/* <TouchableOpacity> */}
				<LabelIcon
					iconEl={
						<MaterialIcons
							name="done"
							size={20}
							color={'#ffffff'}
						/>
					}
					label="English"
					backgroundColor="#00C851"
					absoluteIconPosition="left"
				/>
				{/* </TouchableOpacity> */}
				<VerticalSeparator />
				<LabelIcon label="German" center />
			</View>
		</Card>
	);
};

export default SelectLanguage;
