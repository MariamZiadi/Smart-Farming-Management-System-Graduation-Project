import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
  I18nManager
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('خطأ في التحقق', 'لم يتم العثور على رمز. يرجى تسجيل الدخول مرة أخرى.');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://8c75-41-43-3-74.ngrok-free.app/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
      } catch (error: any) {
        console.error('❌ خطأ في جلب الملف الشخصي:', error);
        if (error.response?.status === 404) {
          Alert.alert('خطأ', 'الملف الشخصي غير موجود (404).');
        } else if (error.response?.status === 401) {
          Alert.alert('خطأ', 'غير مصرح. يرجى تسجيل الدخول مرة أخرى.');
        } else {
          Alert.alert('خطأ', 'فشل في جلب الملف الشخصي. تحقق من الإنترنت أو حاول لاحقًا.');
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
    return <Text style={styles.errorText}>المستخدم غير موجود أو لم يتم تسجيل الدخول.</Text>;
  }

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <Ionicons
        name="arrow-back"
        size={27}
        color="white"
        style={styles.backIcon}
        onPress={() => router.push('./homepage_arabic')}
      />
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>ملفي الشخصي</Text>

        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={70} color="white" />
        </View>

        <View style={styles.inputContainer}>
          {renderField('الاسم', profile.name)}
          {renderField('البريد الإلكتروني', profile.email)}

          <View style={styles.card}>
            <Text style={styles.inputLabel}>المزارع</Text>
            {profile.farms.length > 0 ? (
              <View style={styles.dropdown}>
                {profile.farms.map((farm, index) => (
                  <Text key={index} style={styles.dropdownItem}>
                    🌿 {farm.name}
                  </Text>
                ))}
              </View>
            ) : (
              <Text style={styles.noFarms}>لا توجد مزارع.</Text>
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
    <TextInput
      style={styles.input}
      value={value}
      editable={false}
      textAlign={I18nManager.isRTL ? 'right' : 'left'}
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
