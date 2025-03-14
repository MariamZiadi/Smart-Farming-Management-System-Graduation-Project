
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
import Plant from './app/plant.js';
import MyGarden from './app/mygarden.js';
import AddFarmPage from './app/add_farm.js';import GroupChat from './app/groupchat.js';
import ChatBot from './app/chatbot.js';


const Stack = createStackNavigator();

export default function App() {
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
        {/* <Stack.Screen name="Plant" component={Plant} /> */}
        <Stack.Screen name="MyGraden" component={MyGarden} />
        <Stack.Screen name="Post" component={PostPage} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}