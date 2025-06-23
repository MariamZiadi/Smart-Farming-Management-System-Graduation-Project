import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = "http://10.0.2.2:5000";

type CropReminder = {
  name: string;
  daysLeft: number | string;
  wateringEvery: string;
};

type FarmReminder = {
  farmName: string;
  crops: CropReminder[];
};

// 🌿 English to Arabic crop names
const cropTranslations: { [key: string]: string } = {
  "Strawberry": "فراولة",
  "Cucumber": "خيار",
  "Tomato": "طماطم",
  "Potato": "بطاطس",
  "Grapes": "عنب",
  "Peach": "خوخ",
  "Apple": "تفاح",
  "Mint": "نعناع",
  "Lettuce": "خس",
  "Orange": "برتقال",
  "Blueberry": "توت",
  "Pepper bell": "فلفل",
  "Basil": "ريحان",
  "Thyme": "زعتر",
  "Wheat": "قمح",
  "Barley": "شعير",
  "Rice": "أرز",
  "Oats": "شوفان",
  "Grape": "عنب"
};

const getArabicCropName = (name: string): string => cropTranslations[name] || name;
const getArabicDaysLeft = (value: number | string): string =>
  typeof value === 'number' ? `${value} يوم` : value;
const translateWateringPlan = (text: string): string => {
  const everyMatch = text.match(/every\s+(\d+)/i);
  if (everyMatch) {
    const num = everyMatch[1];
    return `يُنصح بالسقي كل ${num} أيام`;
  }
  return text; 
};

const FarmRemindersPage = () => {
  const router = useRouter();
  const [reminders, setReminders] = useState<FarmReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setError("غير مصرح: لم يتم العثور على الرمز");
        return;
      }

      const response = await axios.get(`${API_URL}/farms/reminders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReminders(response.data.reminders);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("فشل تحميل التذكيرات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/BG2.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Ionicons
          name="arrow-forward" 
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./homepage_arabic')}
        />
        <Text style={styles.title}>تذكيرات مزارعك</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : reminders.length === 0 ? (
          <Text style={styles.noFarmsText}>لا توجد تذكيرات حالياً.</Text>
        ) : (
          reminders.map((farm, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.farmName}>{farm.farmName}</Text>
              {farm.crops.map((crop, idx) => (
                <View key={idx} style={styles.cropContainer}>
                  <Text style={styles.cropName}>🌿 {getArabicCropName(crop.name)}</Text>
                  <Text style={styles.cropText}>
                    💧 خطة السقي: <Text style={styles.highlight}>{translateWateringPlan(crop.wateringEvery)}</Text>
                  </Text>
                  <Text style={styles.cropText}>
                    ⏳ الأيام المتبقية: <Text style={styles.highlight}>{getArabicDaysLeft(crop.daysLeft)}</Text>
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 100,
    direction: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    right: 15, // flipped from left for RTL
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
    top: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noFarmsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffffee',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    top: 20,
  },
  farmName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    textAlign: 'right',
  },
  cropContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f1f8e9',
    borderRadius: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#33691e',
    textAlign: 'right',
  },
  cropText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#558b2f',
    marginTop: 2,
    textAlign: 'right',
  },
  highlight: {
    fontWeight: '700',
    color: '#1b5e20',
  },
});

export default FarmRemindersPage;
