import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

import SingleSight from '../single-sight';

import T from '../../utils/translator';

import styles from './styles';

const SighstList = ({ sights }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={sights}
				keyExtractor={({ en }) => en.name}
				renderItem={({ item }) => {
					return (
						<SingleSight
							name={item.en.name}
							description={item.en.description}
							thumbnail={item.thumbnail}
						/>
					);
				}}
			/>
		</View>
	);
};

export default SighstList;
