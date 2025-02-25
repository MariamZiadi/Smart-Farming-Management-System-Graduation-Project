import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { Link, Stack } from 'expo-router';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 

const ChatBot = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./homepage')}
        />
        <Text style={styles.headerText}>Chatbot</Text>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <Text style={styles.title}>Get Help!</Text>

        {/* Chat Card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>We’re Ready To Help You!</Text>
        </View>

        {/* Chat Input */}
        <TextInput
          style={styles.input}
          placeholder="Message Our Chatbot"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.bottomNav}>
              
              <Link href="./homepage"> 
              <Icon name="home" size={30} color="#000" />
              </Link>
              <Link href="./profile"> 
              <Icon name="person" size={30} color="#000" />
              </Link>
              <Link href="./disease_detection"> 
              <Icon2 name="leaf" size={30} color="#000" />
              </Link>
              <Link href="./feed"> 
              <Icon2 name="file-document-outline" size={30} color="#000" />
              </Link>
              <Link href="./allFarms"> 
              <Icon name="local-florist" size={30} color="#000" />
              </Link>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    paddingVertical: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 25,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    top:20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#444',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    color: '#000',
    position: 'relative',
    top: 25,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#D7E9D4",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 40, 
    backgroundColor: 'white', 
  },
  navItem: {
    fontSize: 24,
  },
});

export default ChatBot;
