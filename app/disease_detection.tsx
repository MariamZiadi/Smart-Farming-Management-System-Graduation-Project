

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PlantDiseaseDetection = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/BG2.jpg')}
      style={styles.background}
    >
        
      <Text style={styles.header}>Plant Disease </Text>
      <Text style={styles.header2}>Detection </Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>Upload Your Plant Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Image
              source={require('../assets/images/imageupload.png')} // Replace with your uploaded placeholder image
              style={styles.imagePlaceholder}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.analysisHeader}>Analysis</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <Text style={styles.analysisText}>
            {imageUri ? 'Analysis Complete!' : 'Waiting for Image..'}
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 4,
    left: 10,
    zIndex: 10,
  },
  backIcon: {
    fontSize: 50,
    color: 'white',
  },
  header: {
    position: 'absolute',
    top: 45,
    left: 62,
    color: 'white',
    fontSize: 45,
    fontFamily: 'DMSerifText-Regular',
    fontWeight: 'semibold',
  },
  header2: {
    position: 'absolute',
    top: 100,
    left: 106,
    color: 'white',
    fontSize: 45,
    fontFamily: 'DMSerifText-Regular',
    fontWeight: 'semibold',
  },
  container: {
    position: 'absolute',
    top: 195,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  uploadButton: {
    left: 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    margin: 20,
    marginBottom: 7,
    width: 270,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(2, 91, 4)',
  },
  imageContainer: {
    height: 200,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 20,
    marginTop: 5,
    marginBottom: 37,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  
  analysisHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    left: 140,
    color: 'rgb(2, 91, 4)',
  },
  analysisText: {
    fontSize: 20,
    left: 110,
  },
});

export default PlantDiseaseDetection;

