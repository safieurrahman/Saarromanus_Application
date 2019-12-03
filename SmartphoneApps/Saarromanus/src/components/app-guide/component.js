import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

import LabelIcon from '../../components/helpers/label_with_icon';

import styles from './styles';

const AppGuide = ({}) => {
	return (
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
				<Text style={styles.label}>
					Lorem ipsum, or lipsum as it is sometimes known, is dummy
					text used in laying out print, graphic or web designs. The
					passage is attributed to an unknown typesetter in the 15th
					century who is thought to have scrambled parts of Cicero's
					De Finibus Bonorum et Malorum for use in a type specimen
					book. Lorem ipsum, or lipsum as it is sometimes known, is
					dummy text used in laying out print, graphic or web designs.
					The passage is attributed to an unknown typesetter in the
					15th century who is thought to have scrambled parts of
					Cicero's De Finibus Bonorum et Malorum for use in a type
					specimen book.
				</Text>
			</View>
		</Card>
	);
};

export default AppGuide;
