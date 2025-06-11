import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Link, Stack } from 'expo-router';
export default function JoinFarmScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/BG2.jpg")} 
      style={styles.background}
    >
      <View style={styles.overlay} />
      <Ionicons
        name="arrow-back"
        size={27}
        color="white"
        style={styles.backIcon}
        onPress={() => router.push("./homepage_arabic")}
      />
      <View style={styles.main}>
        <Text style={styles.title}>انضم لمزرعتك</Text>
        <TextInput
          style={styles.input}
          placeholder="ادخل رمز مرور المزرعة"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>انضم</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomNav}>
        <Link href="./homepage_arabic">
          <Icon name="home" size={30} color="#000" />
        </Link>
        <Link href="./profile_arabic">
          <Icon name="person" size={30} color="#000" />
        </Link>
        <Link href="./disease_detection_arabic">
          <Icon2 name="leaf" size={30} color="#000" />
        </Link>
        <Link href="./feed_arabic">
          <Icon2 name="file-document-outline" size={30} color="#000" />
        </Link>
        <Link href="./allFarms_arabic">
          <Icon name="local-florist" size={30} color="#000" />
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  main: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    color: "#000",
    marginVertical: 16,
  },
  button: {
    backgroundColor: "rgb(51, 99, 51)",
    paddingVertical: 12,
    borderRadius: 8,
    width: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop:20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
    paddingVertical: 10,
    top:235,
  },
  navItem: {
    fontSize: 24,
  },
});
