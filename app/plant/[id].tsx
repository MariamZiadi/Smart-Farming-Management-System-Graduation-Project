
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
const API_URL = "http://10.0.2.2:5000";


interface Plant {
    _id: string;
    name: string;
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
    peach: require('assets/images/peach.jpg')
};

const defaultImage = require('assets/images/wheat.jpg'); 

export default function PlantDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/plants/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPlant(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch plant details");
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

    const plantKey = plant?.name?.toLowerCase() || '';
    const plantImage = plantImages[plantKey] || defaultImage;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={plantImage} style={styles.plantImage} resizeMode="cover" />
                <Text style={styles.title}>{plant?.name}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>💧 Watering Plan</Text>
                    <Text style={styles.value}>{plant?.wateringPlan}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>🌱 Fertilizer Plan</Text>
                    <Text style={styles.value}>{plant?.fertilizerPlan}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fdf9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 0.6,
    borderColor: '#cdeac0',
    alignItems: 'center',
  },
  plantImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgb(9, 71, 10)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  infoRow: {
    width: '100%',
    backgroundColor: '#f3f7f4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 0.8,
    borderColor: 'rgba(9, 71, 10, 0.15)',
  },
  label: {
    fontWeight: '600',
    color: 'rgb(9, 71, 10)',
    fontSize: 18,
    marginBottom: 6,
  },
  value: {
    fontSize: 17,
    color: '#444',
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fdf9',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

