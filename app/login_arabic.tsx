import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

I18nManager.forceRTL(true); // Make sure the app runs RTL (optional, if not already set)

export default function LoginScreenArabic() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'جميع الحقول مطلوبة!');
      return;
    }

    try {
      const response = await axios.post('https://c62b-41-43-3-74.ngrok-free.app/auth/login', { email, password });

      if (response.status === 200) {
        const { token } = response.data;

        await AsyncStorage.setItem('userToken', token);

        Alert.alert('نجاح', 'تم تسجيل الدخول بنجاح!');
        router.replace('/homepage_arabic');
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        Alert.alert('فشل تسجيل الدخول', error.response.data.error);
      } else {
        Alert.alert('فشل تسجيل الدخول', 'حدث خطأ ما. حاول مرة أخرى.');
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <Text style={styles.title}>سعيدون برؤيتك مرة أخرى!</Text>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="أدخل بريدك الإلكتروني"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          textAlign="right"
        />
      </View>

      <View style={styles.passContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="أدخل كلمة المرور"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          textAlign="right"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/signup_arabic')}>
        <Text style={styles.registerText}>
          ليس لديك حساب؟ <Text style={styles.registerLink}>إنشاء حساب</Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  title: { top: 50, fontSize: 45, fontWeight: '600', color: 'rgb(252, 255, 252)', marginBottom: 25, textAlign: 'center' },
  inputContainer: { top: 100, flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 10, marginHorizontal: 15, marginBottom: 25, height: 55 },
  passContainer: { top: 105, flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 10, marginHorizontal: 15, marginBottom: 100, height: 55 },
  icon: { marginLeft: 10 },
  input: { flex: 1, color: '#000', fontSize: 18 },
  eyeIcon: { paddingHorizontal: 5 },
  loginButton: { backgroundColor: 'rgb(9, 71, 10)', paddingVertical: 12, borderRadius: 8, marginHorizontal: 50, marginBottom: 15, marginTop: 70 },
  loginButtonText: { color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  registerText: { textAlign: 'center', color: 'white', fontSize: 19, fontWeight: '600' },
  registerLink: { color: 'rgb(231, 117, 17)', fontSize: 19, textDecorationLine: 'underline', fontWeight: 'bold' },
});
