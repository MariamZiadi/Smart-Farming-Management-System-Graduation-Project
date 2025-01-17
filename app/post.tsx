import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';


export default function PostPage() {

  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const router = useRouter();

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

  };

  const handlePost = () => {
    console.log('Description:', description);
    console.log('Photo URI:', photo);
    
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
    color:'rgb(9, 71, 10)',
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
    top:20,
    backgroundColor: 'rgb(9, 71, 10)',
    marginHorizontal:45,
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
