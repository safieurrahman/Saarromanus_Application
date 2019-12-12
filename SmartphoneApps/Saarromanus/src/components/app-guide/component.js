import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

import LabelIcon from '../../components/helpers/label_with_icon';
import T from '../../utils/translator';

import styles from './styles';

const AppGuide = ({ language }) => {
	return (
		<Card
			title={
				<LabelIcon
					iconEl={
						<AntDesign
							name="infocirlceo"
							size={25}
							color={'#343A40'}
						/>
					}
					label={T.t('userGuildeline')}
					labelFontSize={25}
					labelFontWeight={'bold'}
					separator
					center
				/>
			}>
			<View>
				<Text style={styles.label}>{T.t('loremText')}</Text>
			</View>
		</Card>
	);
};

export default AppGuide;
