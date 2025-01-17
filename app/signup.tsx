import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/images/BG2.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <Text style={styles.title}>Create Your Own Account</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.passContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Icon
            name={showPassword ? 'eye-slash' : 'eye'}
            size={20}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.loginButton}>
        <Link href="./homepage" style={styles.loginButtonText}>Sign Up</Link>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Already have an account?{' '}
        <Link href="./login" style={styles.registerLink}>Sign In</Link>
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
  },
  title: {
    top: 50,
    fontSize: 45,
    fontWeight: 'semibold',
    color: 'rgb(252, 255, 252)',
    marginBottom: 35,
    textAlign: 'center',
  },
  inputContainer: {
    top: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 25,
    height: 55,
  },
  passContainer:
  {
    top: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 55,
    height: 55,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 18,
  },
  eyeIcon: {
    paddingHorizontal: 5,
  },
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
    fontSize: 19,
    fontWeight: 'semibold',
  },
  registerLink: {
    color: 'rgb(231, 117, 17)',
    fontSize: 19,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
