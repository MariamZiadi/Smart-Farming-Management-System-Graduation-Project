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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function SignUpScreen() {
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
      Alert.alert('Error', 'All fields are required!');
    } else if (!isValidEmail(email)) {
      Alert.alert('Error', 'Invalid email format!');
    } else if (!isValidPassword(password)) {
      Alert.alert(
        'Error',
        'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character'
      );
    } else {
      try {
        const response = await axios.post("https://1b98-41-199-183-199.ngrok-free.app/users/register", {
          name,
          email,
          password,
        });
  
        Alert.alert("Success", "User registered successfully!");
        console.log(response.data);
  
        router.push("./homepage"); // ✅ Navigate only on success
      } catch (error: any) {
        Alert.alert("Error", error.response?.data?.message || "Something went wrong");
      }
    }
  };
  

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <Text style={styles.title}>Create Your Own Account</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
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
          placeholder="Enter your password"
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
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.registerText}>
              Already have an account? <Text style={styles.registerLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  title: { top: 50, fontSize: 45, fontWeight: 'semibold', color: 'rgb(252, 255, 252)', marginBottom: 35, textAlign: 'center' },
  inputContainer: { top: 70, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 10, marginHorizontal: 15, marginBottom: 25, height: 55 },
  passContainer: { top: 70, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 10, marginHorizontal: 15, marginBottom: 55, height: 55 },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#000', fontSize: 18 },
  eyeIcon: { paddingHorizontal: 5 },
  loginButton: { backgroundColor: 'rgb(9, 71, 10)', paddingVertical: 12, borderRadius: 8, marginHorizontal: 50, marginBottom: 15, marginTop: 70 },
  loginButtonText: { color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  registerText: {textAlign: 'center', color: 'white', fontSize: 19, fontWeight: 'semibold' },
  registerLink: { color: 'rgb(231, 117, 17)', fontSize: 19, textDecorationLine: 'underline', fontWeight: 'bold' },
});
