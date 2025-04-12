import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define the Profile type
interface Profile {
  name: string;
  email: string;
  image: string | null;
}

const ProfileScreen = () => {
  const [profile, setProfile] = useState<Profile | null>(null); // Profile state with type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('Authentication Error', 'User not authenticated!');
          return;
        }

        const response = await axios.get('http://10.0.2.2:5000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="white" style={styles.loader} />;
  }

  if (!profile) {
    return <Text style={styles.errorText}>User not found.</Text>;
  }

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image (Uncomment if image is available in the response) */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: profile.image || 'https://via.placeholder.com/150' }} 
            style={styles.profileImage} 
          />
        </View>

        <Text style={styles.title}>My Profile</Text>

        <View style={styles.inputContainer}>
          {renderField('Name', profile.name)}
          {renderField('Email', profile.email)}
          {/* Add more fields here if required */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// Reusable function to render profile fields
const renderField = (label: string, value: string) => (
  <View style={styles.field}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} value={value || 'N/A'} editable={false} />
  </View>
);

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  scrollContainer: { padding: 10 },
  imageContainer: { top: 40, alignItems: 'center', marginBottom: 20 },
  title: { color: 'white', fontSize: 33, textAlign: 'center', marginTop: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  inputContainer: { top: 50, paddingHorizontal: 10 },
  field: { marginBottom: 15 },
  inputLabel: { fontSize: 20, color: 'white', marginBottom: 5 },
  input: { backgroundColor: '#f5f5f5', height: 55, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, color: '#333' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20, fontSize: 18 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProfileScreen;
