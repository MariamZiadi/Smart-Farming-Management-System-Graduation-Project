import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  I18nManager,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function PostPage() {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const router = useRouter();

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('يجب السماح بالوصول إلى مكتبة الصور!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!description.trim()) {
      alert('يرجى إدخال وصف قبل النشر.');
      return;
    }

    try {
      const token = 'YOUR_AUTH_TOKEN'; // Replace with actual logic

      const response = await fetch('https://8c75-41-43-3-74.ngrok-free.app/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          photo,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('تفاصيل الخطأ:', errorDetails);
        throw new Error('فشل إرسال المنشور');
      }

      const result = await response.json();
      console.log('تم إنشاء المنشور:', result);

      alert('تم نشر تجربتك بنجاح!');

      setDescription('');
      setPhoto(null);
      router.push('./feed_arabic');
    } catch (error) {
      console.error('خطأ أثناء النشر:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء إرسال المنشور.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={27}
        style={styles.backIcon}
        onPress={() => router.push('./feed_arabic')}
      />
      <Text style={styles.title}>شارك تجربتك معنا!</Text>
      <View style={styles.form}>
        <Text style={styles.label}>الوصف</Text>
        <TextInput
          style={styles.input}
          placeholder="اكتب هنا..."
          placeholderTextColor="#777"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
        />

        <Text style={styles.label}>أرفق صورة</Text>
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

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>نشر</Text>
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
    color: 'rgb(9, 71, 10)',
    marginTop: 30,
    marginLeft: 10,
  },
  title: {
    marginTop: 25,
    fontSize: 30,
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
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  input: {
    height: 100,
    backgroundColor: 'rgb(241, 241, 241)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    color: '#333',
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
    top: 20,
    backgroundColor: 'rgb(9, 71, 10)',
    marginHorizontal: 45,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
