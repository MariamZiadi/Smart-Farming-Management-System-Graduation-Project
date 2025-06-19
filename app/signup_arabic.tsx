import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

I18nManager.forceRTL(true); // Force Right-To-Left layout

export default function SignUpScreenAr() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('خطأ', 'جميع الحقول مطلوبة!');
    } else if (!isValidEmail(email)) {
      Alert.alert('خطأ', 'صيغة البريد الإلكتروني غير صحيحة!');
    } else if (!isValidPassword(password)) {
      Alert.alert(
        'خطأ',
        'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل وتشمل حرف كبير، صغير، رقم، ورمز خاص'
      );
    } else {
      try {
        const response = await axios.post("https://2bd3-102-45-148-78.ngrok-free.app/users/register", {
          name,
          email,
          password,
        });

        const { token, userId } = response.data;

        await AsyncStorage.setItem("userToken", token);

        Alert.alert("تم", "تم إنشاء الحساب بنجاح!");
        console.log(response.data);

        router.push("./homepage_arabic"); // ✅ Navigate to Arabic homepage
      } catch (error: any) {
        Alert.alert("خطأ", error.response?.data?.message || "حدث خطأ ما");
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <Text style={styles.title}>إنشاء حساب جديد</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="أدخل اسمك الكامل"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="أدخل بريدك الإلكتروني"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.passContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="أدخل كلمة المرور"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>تسجيل</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login_arabic')}>
        <Text style={styles.registerText}>
          لديك حساب بالفعل؟ <Text style={styles.registerLink}>تسجيل الدخول</Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  title: {
    top: 50,
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 35,
    textAlign: 'center',
  },
  inputContainer: {
    top: 70,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 25,
    height: 55,
  },
  passContainer: {
    top: 70,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 55,
    height: 55,
  },
  icon: { marginLeft: 10 },
  input: { flex: 1, color: '#000', fontSize: 18, textAlign: 'right' },
  eyeIcon: { paddingHorizontal: 5 },
  loginButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 50,
    marginBottom: 15,
    marginTop: 70,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  registerLink: {
    color: 'orange',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
