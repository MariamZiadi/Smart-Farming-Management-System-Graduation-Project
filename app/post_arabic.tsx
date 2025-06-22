import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
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
        'https://4f93-102-45-148-78.ngrok-free.app/posts',
        {
          description,
          image,
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
    <ImageBackground
      source={require('../assets/images/BG2.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.pageTitle}>انشر مدونتك</Text>

        <Text style={styles.label}>محتوى المدونة</Text>
        <TextInput
          style={styles.input}
          placeholder="شارك خبراتك و افكارك.."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.imageUploadArea} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <View style={styles.placeholderContent}>
              <Text style={styles.placeholderIcon}>📸</Text>
              <Text style={styles.placeholderText}>اضغط لتحميل صورة</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={handlePostUpload}>
          <Text style={styles.uploadButtonText}>نشر</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(163, 222, 164)',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: 'rgb(255, 255, 255)',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 120,
    borderColor: 'rgba(9, 71, 10, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
    textAlignVertical: 'top',
    fontSize: 14.5,
    color: '#333',
  },
  imageUploadArea: {
    height: 200,
    borderWidth: 1.5,
    borderColor: 'rgba(9, 71, 10, 0.3)',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholderContent: {
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 32,
    marginBottom: 6,
    color: 'rgb(9, 71, 10)',
  },
  placeholderText: {
    fontSize: 14,
    color: '#555',
  },
  uploadButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    padding: 14,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PostScreen;
