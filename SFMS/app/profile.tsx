import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView // Import ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import poster from '../assets/images/poster.jpg';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: 'Maryam Ziadi',
    email: 'm@hotmail.com',
    phone: '01234567844',
    image: poster,
    farms: 'Farm 1', // Initial farm value
  });

  const handleEdit = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleImagePicker = () => {
    // Logic to pick image from the library (if necessary)
  };

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={profile.image} style={styles.profileImage} />
        </View>
        <Text style={styles.title}> My Profile </Text>
        {/* Editable Fields */}
        <View style={styles.inputContainer}>
          {renderField('Name', profile.name, 'name', handleEdit)}
          {renderField('Phone Number', profile.phone, 'phone', handleEdit)}
          {renderField('Email', profile.email, 'email', handleEdit)}

          {/* Farms as a Dropdown List */}
          <View style={styles.field}>
            <Text style={styles.inputLabel}>Farms</Text>
            <Picker

              style={styles.picker}>
              <Picker.Item label="Farm 1" value="Farm 1" />
              <Picker.Item label="Farm 2" value="Farm 2" />
              <Picker.Item label="Farm 3" value="Farm 3" />
              <Picker.Item label="Farm 4" value="Farm 4" />
              <Picker.Item label="Farm 5" value="Farm 5" />
            </Picker>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const renderField = (label, value, key, handleEdit) => (
  <View style={styles.field}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      editable={true}
      onChangeText={(text) => handleEdit(key, text)}
    />
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
  },
  scrollContainer: {
    padding: 10, // Adding padding to the scroll view
  },
  imageContainer: {
    top: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 33,
    left: 110,
    top: 35,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  inputContainer: {
    top: 50,
    paddingHorizontal: 10,
    color: 'white',
  },
  field: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  picker: {
    height: 55,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
