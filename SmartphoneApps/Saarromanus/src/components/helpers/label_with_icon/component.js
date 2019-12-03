import React from 'react';
import { View, Text } from 'react-native';

import SpaceLeft from '../space-left';
import VerticalSeparator from '../vertical-separator';

export default ({
	iconEl,
	label,
	labelFontSize = 20,
	labelFontWeight = 'normal',
	separator = false,
	center,
}) => {
	return (
		<View
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: center ? 'center' : 'space-evenly',
					width: center ? '100%' : '40%',
				}}>
				{iconEl}
				<SpaceLeft value={iconEl && center ? 15 : 0}>
					<Text
						style={{
							fontSize: labelFontSize,
							fontWeight: labelFontWeight,
						}}>
						{label}
					</Text>
				</SpaceLeft>
			</View>
			{separator && <VerticalSeparator />}
		</View>
	);
};
