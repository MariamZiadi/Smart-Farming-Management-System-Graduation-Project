import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  I18nManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
const API_URL = "http://10.0.2.2:5000";

I18nManager.allowRTL(true);

export default function JoinFarmScreenAr() {
  const router = useRouter();
  const [farmPassword, setFarmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleJoinFarm = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("غير مصرح", "يجب تسجيل الدخول للانضمام إلى المزرعة.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/farms/join`,
        { password: farmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("نجاح", response.data.message);
      router.push("./allFarms_arabic");
    } catch (error: any) {
      console.error("خطأ في الانضمام إلى المزرعة:", error);
      Alert.alert("خطأ", error.response?.data?.message || "فشل في الانضمام إلى المزرعة.");
    }
  };

  return (
    <ImageBackground source={require("../assets/images/BG2.jpg")} style={styles.background}>
      <View style={styles.overlay} />
      <Ionicons name="arrow-back" size={27} color="white" style={styles.backIcon} onPress={() => router.push("./homepage_ar")} />
      <View style={styles.main}>
        <Text style={styles.title}>انضم إلى مزرعتك</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder="أدخل كلمة مرور المزرعة"
            placeholderTextColor="#888"
            value={farmPassword}
            onChangeText={setFarmPassword}
            secureTextEntry={!showPassword}
            textAlign="right"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Icon2 name={showPassword ? 'eye-off' : 'eye'} size={20} color="#aaa" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleJoinFarm}>
          <Text style={styles.buttonText}>انضم</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomNav}>
        <Link href="./homepage_arabic"><Icon name="home" size={30} color="#000" /></Link>
        <Link href="./profile_arabic"><Icon name="person" size={30} color="#000" /></Link>
        <Link href="./disease_detection_arabic"><Icon2 name="leaf" size={30} color="#000" /></Link>
        <Link href="./feed_arabic"><Icon2 name="file-document-outline" size={30} color="#000" /></Link>
        <Link href="./allFarms_arabic"><Icon name="local-florist" size={30} color="#000" /></Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0, 0, 0, 0.5)" },
  backIcon: { position: "absolute", top: 40, left: 10 },
  main: { alignItems: "center", marginHorizontal: 16 },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginVertical: 16,
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  eyeIcon: { paddingHorizontal: 5 },
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
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
    paddingVertical: 10,
    top: 235,
  },
});
