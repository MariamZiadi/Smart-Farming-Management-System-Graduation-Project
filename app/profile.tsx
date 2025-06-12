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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Profile {
  name: string;
  email: string;
  image: string | null;
  farms: string[];
}

const ProfileScreen = () => {
  const router = useRouter();

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

        const response = await axios.get('https://ff64-41-43-3-74.ngrok-free.app/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

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
      <Ionicons
        name="arrow-back"
        size={27}
        color="white"
        style={styles.backIcon}
        onPress={() => router.push('./homepage')}
      />
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: profile.image || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.title}>My Profile</Text>

        {/* 👤 Default Icon under My Profile */}
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={70} color="white" />
        </View>

        <View style={styles.inputContainer}>
          {renderField('Name', profile.name)}
          {renderField('Email', profile.email)}

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Farms</Text>
            {profile.farms.length > 0 ? (
              <View style={styles.dropdown}>
                {profile.farms.map((farm, index) => (
                  <Text key={index} style={styles.dropdownItem}>
                    🌿 {farm}
                  </Text>
                ))}
              </View>
            ) : (
              <Text style={styles.noFarms}>No farms found.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const renderField = (label: string, value: string) => (
  <View style={styles.card}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} value={value} editable={false} />
  </View>
);

const styles = StyleSheet.create({
  backIcon: {
    marginTop: 40,
    marginLeft: 15,
    position: 'absolute',
    zIndex: 2,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 70,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  field: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f0f0f0',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  dropdownItem: {
    color: '#333',
    fontSize: 16,
    paddingVertical: 4,
  },
  noFarms: {
    color: '#888',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
