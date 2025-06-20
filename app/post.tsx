// ✅ post.tsx - Create a new post
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PostScreen = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePostUpload = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Error', 'You must be logged in to post.');
      return;
    }

    await axios.post(
      'https://f2b6-41-199-4-67.ngrok-free.app/posts',
      {
        description,
        image, // assuming it's a URL or base64 string
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigation.goBack();
  } catch (error: any) {
    console.error('❌ Post upload error:', error);
    Alert.alert('Upload Error', error.response?.data?.message || 'Failed to upload post.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Write something..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick an Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={handlePostUpload}>
        <Text style={styles.uploadButtonText}>Upload Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PostScreen;