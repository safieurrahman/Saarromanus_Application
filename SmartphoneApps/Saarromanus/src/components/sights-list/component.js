import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

import SingleSight from '../single-sight';

import styles from './styles';

const SighstList = ({ sights }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={sights}
				keyExtractor={sight => sight.id + ''}
				renderItem={({ item }) => {
					return (
						<SingleSight
							id={item.id}
							name={item.name}
							description={'item.en.description'}
							thumbnail={item.thumbnail}
						/>
					);
				}}
			/>
		</View>
	);
};

export default SighstList;
