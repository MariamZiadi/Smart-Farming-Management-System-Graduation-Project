import React from 'react';
import { Link, Stack } from 'expo-router';

import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  //const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/BG3.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.topText}>Plant Smarter</Text>
        <Text style={styles.topText2}>Grow Stronger</Text>


        <View style={styles.options}>
        
          <TouchableOpacity style={[styles.button, styles.greenButton]}>
            <Text style={[styles.buttonText, styles.greenText]}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.whiteButton]}>
            <Text style={[styles.buttonText, styles.greenText]}>
              Create an Account
            </Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20,
  },
  options: {
    top: 220,
    width: 300, // Adjust width for better button alignment
    alignItems: 'center',
  },
  topText: {
    position: 'absolute',
    top: 110,
    left: 20,
    color: 'white',
    fontSize: 44,
    fontFamily: 'DMSerifText-Regular',
    fontWeight: 'semibold',
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
    borderRadius: 10,
    marginBottom: 20, // Space between buttons
    width: '100%',
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(2, 91, 4)' // Green background
  },
  whiteButton: {
    backgroundColor: 'white', // White background
    borderWidth: 2,
    borderColor: 'rgb(2, 91, 4)', // Green border for better visibility
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  greenText: {
    color: 'rgb(2, 91, 4)', // Green text
  },
});
