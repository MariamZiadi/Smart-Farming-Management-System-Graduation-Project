import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import LanguageSwitcher from '../components/LanguageSwitcher'; 

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/BG3.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Language Switcher at the top right */}
      <LanguageSwitcher />

      <View style={styles.content}>
        <Text style={styles.topText}>Plant Smarter</Text>
        <Text style={styles.topText2}>Grow Stronger</Text>

        <View style={styles.options}>
          <Link href="/login_arabic" style={[styles.button, styles.greenButton]}>
            <Text style={[styles.buttonText, styles.greenText]}>تسجيل الدخول</Text>
          </Link>
          <Link href="/signup_arabic" style={[styles.button, styles.greenButton]}>
            <Text style={[styles.buttonText, styles.greenText]}>إنشاء حساب</Text>
          </Link>
          <Link href="/homepage_arabic" style={[styles.button, styles.greenButton]}>
            <Text style={[styles.buttonText, styles.greenText]}>الصفحة الرئيسية</Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },
  options: {
    top: 220,
    width: 250, 
    alignItems: 'center',
  },
  topText: {
    position: 'absolute',
    top: 110,
    left: 20,
    color: 'white',
    fontSize: 44,
    fontFamily: 'DMSerifText-Regular', // Optional: make sure it's loaded
    fontWeight: '600',
  },
  topText2: {
    position: 'absolute',
    top: 170,
    left: 70,
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 15, 
    paddingHorizontal: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    width: '90%', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  greenButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  greenText: {
    color: 'rgb(2, 91, 4)', 
  },
});
