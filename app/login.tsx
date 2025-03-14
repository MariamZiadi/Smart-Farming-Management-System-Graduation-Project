import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Import the types
import { useRouter } from 'expo-router';


type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>; // Define the type

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<NavigationProps>(); // Apply the correct type

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:5000/auth/login', { email, password });

      if (response.status === 200) {
        Alert.alert('Success', 'Login Successful!');
        router.push("./homepage"); // ✅ Navigate only on success
      }
    } catch (error: any) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <Text style={styles.title}>Glad to See You, Again!</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
      
            <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style={styles.registerText}>
                    Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  title: { top: 50, fontSize: 45, fontWeight: 'semibold', color: 'rgb(252, 255, 252)', marginBottom: 25, textAlign: 'center' },
  inputContainer: { top: 100, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 10, marginHorizontal: 15, marginBottom: 25, height: 55 },
  passContainer: { top: 105, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 10, marginHorizontal: 15, marginBottom: 100, height: 55 },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#000', fontSize: 18 },
  eyeIcon: { paddingHorizontal: 5 },
  loginButton: { backgroundColor: 'rgb(9, 71, 10)', paddingVertical: 12, borderRadius: 8, marginHorizontal: 50, marginBottom: 15, marginTop: 70 },
  loginButtonText: { color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  registerText: {textAlign: 'center', color: 'white', fontSize: 19, fontWeight: 'semibold' },
  registerLink: { color: 'rgb(231, 117, 17)', fontSize: 19, textDecorationLine: 'underline', fontWeight: 'bold' },
});
