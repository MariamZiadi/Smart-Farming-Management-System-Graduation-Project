import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import dotenv from 'dotenv';
dotenv.config();
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/index.js';
import LoginScreen from './app/login.js';
import SignUpScreen from './app/signup.js';
import DiseaseScreen from './app/disease_detection.js';
import FeedPage from './app/feed.js';
import ProfileScreen from './app/profile.js';
import PostPage from './app/post.js';
import Homepage from './app/homepage.js';
import MyGarden from './app/mygarden.js';
import AddFarmPage from './app/add_farm.js';
import GroupChat from './app/groupchat.js';
import ChatBot from './app/chatbot.js';
import WeatherNotifier from './app/weatherNotifier.js'; // ✅ Import

const Stack = createStackNavigator();

// Notification handler for pop-up alerts
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const requestPermissionsAndNotify = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Notification permissions not granted!');
        }
      }
    };

    requestPermissionsAndNotify();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Disease" component={DiseaseScreen} />
        <Stack.Screen name="Feed" component={FeedPage} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="MyGraden" component={MyGarden} />
        <Stack.Screen name="Post" component={PostPage} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
        <Stack.Screen name="WeatherNotifier" component={WeatherNotifier} /> {/* ✅ Added */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
