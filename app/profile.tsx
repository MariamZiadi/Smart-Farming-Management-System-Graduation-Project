import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import poster from '../assets/images/poster.jpg';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'J@hotmail.com',
    phone: '01234567844',
    image: poster,
    farms: 'Farm 1', 
  });

  const handleEdit = (key, value) => {
    setProfile({ ...profile, [key]: value });
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
          <View style={[styles.pickerContainer, styles.field]}>
            <Text style={styles.inputLabel}>Farms</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={profile.farms}
                onValueChange={(itemValue) => handleEdit('farms', itemValue)}
                style={styles.picker}>
                <Picker.Item label="Farm 1" value="Farm 1" />
                <Picker.Item label="Farm 2" value="Farm 2" />
                <Picker.Item label="Farm 3" value="Farm 3" />
              </Picker>
            </View>
          </View>
        </View>
      </ScrollView>
<View style={styles.bottomNav}>
        <Link href="./homepage">
          <Icon name="home" size={30} color="#000" />
        </Link>
        <View style={[styles.iconContainer, styles.shadow]}>
  <Link href="./profile">
    <Icon name="person" size={30} color="#000" />
  </Link>
</View>

        <Link href="./disease_detection">
          <Icon2 name="leaf" size={30} color="#000" />
        </Link>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  scrollContainer: {
    padding: 10, 
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
  pickerContainer: {
    marginBottom: 15,
  },
  pickerWrapper: {
    backgroundColor: '#f5f5f5', 
    borderRadius: 12, 
    overflow: 'hidden', 
  },
  picker: {
    height: 55,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 40, 
    backgroundColor: 'white', 
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, 
  },
  navItem: {
    fontSize: 24,
  },
});

export default ProfileScreen;
