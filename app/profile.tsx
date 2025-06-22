import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Farm {
  _id: string;
  name: string;
}

interface Profile {
  name: string;
  email: string;
  image: string | null;
  farms: Farm[];
}

const ProfileScreen = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showFarms, setShowFarms] = useState(true);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('https://07bc-102-45-148-78.ngrok-free.app/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error: any) {
      console.error('❌ Error fetching profile:', error);
      Alert.alert('Error', 'Failed to fetch profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
      setShowFarms(false);

      // Delay focus to let modal open first
      setTimeout(() => {
        nameRef.current?.focus();
        nameRef.current?.setNativeProps({ selection: { start: 0, end: name.length } });
      }, 200);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put('https://07bc-102-45-148-78.ngrok-free.app/auth/profile', {
        name,
        email,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("✅ Success", "Profile updated successfully.");
      setIsEditing(false);
      Keyboard.dismiss();
      await fetchUserProfile(); // refetch to update farms
      setShowFarms(true);
    } catch (err) {
      console.error("Profile update failed", err);
      Alert.alert("❌ Error", "Failed to update profile.");
    }
  };

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
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={70} color="white" />
        </View>

        <View style={styles.inputContainer}>
          <EditableField
            label="Name"
            value={name}
            onChangeText={setName}
            editable={isEditing}
            inputRef={nameRef}
          />
          <EditableField
            label="Email"
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            inputRef={emailRef}
          />

          {showFarms && (
            <View style={styles.card}>
              <Text style={styles.inputLabel}>Farms</Text>
              {profile.farms.length > 0 ? (
                <View style={styles.dropdown}>
                  {profile.farms.map((farm, index) => (
                    <Text key={index} style={styles.dropdownItem}>
                      🌿 {farm.name}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.noFarms}>No farms found.</Text>
              )}
            </View>
          )}

          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.saveButton}>
              {isEditing ? 'Save Changes' : '✏️ Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const EditableField = ({
  label,
  value,
  onChangeText,
  editable,
  inputRef,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
  inputRef: React.RefObject<TextInput>;
}) => (
  <View style={styles.card}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      ref={inputRef}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      selectTextOnFocus={editable}
    />
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
  saveButton: {
    backgroundColor: '#1b5e20',
    color: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
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
