import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function PostPage() {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null); // To store the photo URI
  const router = useRouter();

  // Function to request permission and open the image picker
  const handleChoosePhoto = async () => {
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

    // Check if the user canceled the picker and handle accordingly
    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Update the URI using assets[0].uri
    }
  };

  // Function to handle posting the content
  const handlePost = async () => {
    if (!description.trim()) {
      alert('Please enter a description before posting.');
      return;
    }

    try {
      // Logging the description and photo to ensure they're correct
      console.log('Description:', description);
      console.log('Photo URI:', photo || 'No image attached');

      // Obtain the token (assuming you're using Firebase or other authentication method)
      const token = 'YOUR_AUTH_TOKEN';  // Replace with actual token logic

      // Sending the data to the backend API with the authorization token
      const response = await fetch('https://9a6c-154-239-97-37.ngrok-free.app/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Add token here
        },
        body: JSON.stringify({
          description,
          photo, // Optional URI
        }),
      });

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error response:', errorDetails); // Log the error details
        throw new Error('Failed to submit post');
      }

      const result = await response.json();
      console.log('Post created:', result);

      // Show a success alert and clear form
      alert('Post submitted successfully!');

      setDescription('');
      setPhoto(null);
      router.push('./feed'); // Redirect to the feed page
    } catch (error) {
      console.error('Error posting:', error);
      Alert.alert('Error', 'Something went wrong while submitting your post.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={27}
        style={styles.backIcon}
        onPress={() => router.push('./feed')}
      />
      <Text style={styles.title}>Share Your Experience With Us!</Text>
      <View style={styles.form}>
        {/* Description Input */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Write here..."
          placeholderTextColor="#777"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        {/* Photo Upload */}
        <Text style={styles.label}>Upload Photo</Text>
        <TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photoPreview} />
          ) : (
            <Image
              source={require('../assets/images/imageupload.png')}
              style={styles.imagePlaceholder}
            />
          )}
        </TouchableOpacity>

        {/* Post Button */}
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backIcon: {
    color: 'rgb(9, 71, 10)',
    marginTop: 30,
    marginLeft: 10,
  },
  title: {
    marginTop: 25,
    fontSize: 35,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 100,
    backgroundColor: 'rgb(241, 241, 241)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  photoButton: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postButton: {
    top: 20,
    backgroundColor: 'rgb(9, 71, 10)',
    marginHorizontal: 45,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
