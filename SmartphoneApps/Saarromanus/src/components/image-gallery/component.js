import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal } from 'react-native';

import styles from './styles';

const ImageGallery = ({ images }) => {
	const [currentImage, setCurrentImage] = useState(null);

	const [displayImage, setDisplayImage] = useState(false);

	return (
		<View style={styles.container}>
			{images.map(image => (
				<TouchableOpacity
					style={styles.imageList}
					key={image.url}
					onPress={() => {
						setCurrentImage(image), setDisplayImage(true);
					}}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={{ uri: image.url }}
							resizeMode="cover"
						/>
					</View>
				</TouchableOpacity>
			))}
			<Modal
				animationType="fade"
				transparent={false}
				visible={displayImage}
				onRequestClose={() => setDisplayImage(false)}>
				<View style={styles.modal}>
					{currentImage && (
						<Image
							style={styles.imageFull}
							source={{ uri: currentImage.url }}
							resizeMode="center"
						/>
					)}
				</View>
			</Modal>
		</View>
	);
};

export default ImageGallery;
