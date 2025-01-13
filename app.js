import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'app/index.tsx'; 
import LoginScreen from 'app/login.tsx'; 
import SignUpScreen from 'app/signup.tsx';
import DiseaseScreen from 'app/disease_detection.tsx';
import FeedPage from 'app/feed.tsx';
import Homepage from 'app/homepage.tsx';
import Plant from 'app/plant.tsx';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Disease" component={DiseaseScreen} />
        <Stack.Screen name="Feed" component={FeedPage} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Plant" component={Plant} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}