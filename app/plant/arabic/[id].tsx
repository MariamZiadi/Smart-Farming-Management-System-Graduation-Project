import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface Plant_arabic {
  _id: string;
  name: string; // Arabic name
  englishName: string; // English name from backend (added field)
  wateringPlan: string;
  fertilizerPlan: string;
}

const { width } = Dimensions.get('window');

const plantImages: Record<string, any> = {
  apple: require('assets/images/apple.png'),
  barley: require('assets/images/barley.jpeg'),
  basil: require('assets/images/basil.jpg'),
  blueberry: require('assets/images/blueberry.jpg'),
  cherry: require('assets/images/cherryhomeplant.jpg'),
  corn: require('assets/images/cornhomeplant.jpg'),
  cucumber: require('assets/images/cucumber.jpg'),
  grape: require('assets/images/grape.jpeg'),
  lettuce: require('assets/images/lettuce.jpg'),
  mint: require('assets/images/mint.jpg'),
  nettle: require('assets/images/nettle.jpg'),
  oats: require('assets/images/oats.jpg'),
  orange: require('assets/images/orange.png'),
  'pepper bell': require('assets/images/pepper.jpg'),
  rice: require('assets/images/rice.jpg'),
  thyme: require('assets/images/thyme.jpg'),
  tomato: require('assets/images/tomato.jpg'),
  wheat: require('assets/images/wheat.jpg'),
  peach: require('assets/images/peach.jpg'),
};

const defaultImage = require('assets/images/wheat.jpg');

export default function PlantDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant_arabic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://cad5-102-45-148-78.ngrok-free.app/plants/arabic/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlant(data);
        setLoading(false);
      })
      .catch(() => {
        setError("فشل في تحميل تفاصيل النبات");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const plantKey = plant?.englishName?.toLowerCase() || '';
  const plantImage = plantImages[plantKey] || defaultImage;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={plantImage} style={styles.plantImage} resizeMode="cover" />
        <Text style={styles.title}>{plant?.name}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>💧 خطة الري</Text>
          <Text style={styles.value}>{plant?.wateringPlan}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>🌱 خطة التسميد</Text>
          <Text style={styles.value}>{plant?.fertilizerPlan}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fff7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: width - 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    overflow: 'hidden',
  },
  plantImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#4caf50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  infoRow: {
    width: '100%',
    backgroundColor: '#f1f8f2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontWeight: '700',
    color: '#388e3c',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'right',
    width: '100%',
  },
  value: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    textAlign: 'right',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
