import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CropReminder = {
  name: string;
  daysLeft: number | string;
  wateringEvery: string;
};

type FarmReminder = {
  farmName: string;
  crops: CropReminder[];
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
        setError("Unauthorized: No token found");
        return;
      }

      const response = await axios.get("https://1ed1-197-121-193-54.ngrok-free.app/farms/reminders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReminders(response.data.reminders);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load reminders");
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
          name="arrow-back"
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./homepage')}
        />
        <Text style={styles.title}>Your Farms Reminders</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : reminders.length === 0 ? (
          <Text style={styles.noFarmsText}>No reminders available.</Text>
        ) : (
          reminders.map((farm, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.farmName}>{farm.farmName}</Text>
              {farm.crops.map((crop, idx) => (
                <View key={idx} style={styles.cropContainer}>
                  <Text style={styles.cropName}>🌿 {crop.name}</Text>
                  <Text style={styles.cropText}>
                    💧 Watering Plan: <Text style={styles.highlight}>{crop.wateringEvery}</Text>
                  </Text>
                  <Text style={styles.cropText}>
                    ⏳ Days Left: <Text style={styles.highlight}>{crop.daysLeft}</Text>
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
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
    top:20,
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
  },
  cropText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#558b2f',
    marginTop: 2,
  },
  highlight: {
    fontWeight: '700',
    color: '#1b5e20',
  },
});

export default FarmRemindersPage;
