import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons for a wider icon selection
import { Link } from 'expo-router';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const PlantDiseaseDetection = () => {
  const router = useRouter();

  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Permission to access media library is required!');
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // If the user selected an image, update the state
    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Set the URI of the selected image
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/BG2.jpg')}
      style={styles.background}
    >
      <Ionicons
        name="arrow-back"
        size={27}
        color="white"
        style={styles.backIcon}
        onPress={() => router.push('./homepage')}
      />
      <Text style={styles.header}>Plant Disease </Text>
      <Text style={styles.header2}>Detection </Text>
      <View style={styles.container}>
        {/* Button to Upload Image */}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>Upload Your Plant Image</Text>
        </TouchableOpacity>

        {/* Display Uploaded Image */}
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Image
              source={require('../assets/images/imageupload.png')} // Placeholder image
              style={styles.imagePlaceholder}
            />
          )}
        </TouchableOpacity>

        {/* Analysis Section */}
        <Text style={styles.analysisHeader}>Analysis</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <Text style={styles.analysisText}>
            {imageUri ? 'Analysis Complete!' : 'Waiting for Image..'}
          </Text>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="./homepage">
          <Icon name="home" size={30} color="#000" />
        </Link>
        <Link href="./profile">
          <Icon name="person" size={30} color="#000" />
        </Link>
        <View style={[styles.iconContainer, styles.shadow]}>
        <Link href="./disease_detection">
          <Icon2 name="leaf" size={30} color="#000" />
        </Link>
        </View>
        <Link href="./feed">
          <Icon2 name="file-document-outline" size={30} color="#000" />
        </Link>
        <Link href="./allFarms">
          <Icon name="local-florist" size={30} color="#000" />
        </Link>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backIcon: {
    marginTop: 30,
    marginLeft: 10,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 62,
    color: 'white',
    fontSize: 45,
    fontFamily: 'DMSerifText-Regular',
    fontWeight: 'semibold',
  },
  header2: {
    position: 'absolute',
    top: 105,
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
    bottom: 50, // Adjusted for the bottom nav
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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 40, // To make the icon's background circular
    backgroundColor: 'white', // Optional, to set a background color
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // For Android shadow
  },
  navItem: {
    fontSize: 24,
  },
});

export default PlantDiseaseDetection;
