import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Profile {
  name: string;
  email: string;
  image: string | null;
}

const ProfileScreen = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (!token) {
          Alert.alert('Authentication Error', 'No token found. Please log in again.');
          setLoading(false);
          return;
        }

        // ✅ Ensure the correct path matches backend route
        const response = await axios.get('https://cb93-154-239-126-13.ngrok-free.app/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('✅ Profile fetched:', response.data);
        setProfile(response.data);
      } catch (error: any) {
        console.error('❌ Error fetching profile:', error);

        if (error.response?.status === 404) {
          Alert.alert('Error', 'Profile not found (404).');
        } else if (error.response?.status === 401) {
          Alert.alert('Error', 'Unauthorized. Please log in again.');
        } else {
          Alert.alert('Error', 'Failed to fetch profile. Check your internet or try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={styles.loader} />;
  }

  if (!profile) {
    return <Text style={styles.errorText}>User not found or not logged in.</Text>;
  }

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const renderField = (label: string, value: string) => (
  <View style={styles.field}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} value={value} editable={false} />
  </View>
);

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  scrollContainer: { padding: 10 },
  imageContainer: { top: 40, alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  title: { color: 'white', fontSize: 33, textAlign: 'center', marginTop: 20 },
  inputContainer: { top: 50, paddingHorizontal: 10 },
  field: { marginBottom: 15 },
  inputLabel: { fontSize: 20, color: 'white', marginBottom: 5 },
  input: {
    backgroundColor: '#f5f5f5',
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20, fontSize: 18 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProfileScreen;
