import React, { useState } from 'react';
import {
	View,
	Image,
	TouchableOpacity,
	Modal,
	Text,
	TouchableHighlight,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import VerticalSeparator from '../helpers/vertical-separator';

import T from '../../utils/translator';

import styles from './styles';

const ImageGallery = ({ images }) => {
	const [currentImage, setCurrentImage] = useState(null);

	const [displayImage, setDisplayImage] = useState(false);
	return (
		<View style={styles.container}>
			{/* <View style={styles.imageContainer}> */}
			{images.map(image => (
				<TouchableOpacity
					style={styles.imageList}
					key={image.title}
					onPress={() => {
						setCurrentImage(image), setDisplayImage(true);
					}}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={image.url}
							resizeMode="cover"
						/>
					</View>
					{/* <VerticalSeparator /> */}
				</TouchableOpacity>
			))}
			{/* </View> */}
			<Modal
				animationType="fade"
				transparent={false}
				visible={displayImage}
				onRequestClose={() => setDisplayImage(false)}>
				<View style={styles.modal}>
					{currentImage && (
						<Image
							style={styles.imageFull}
							source={currentImage.url}
							resizeMode="center"
						/>
					)}
				</View>
			</Modal>
		</View>
	);
};

export default ImageGallery;
