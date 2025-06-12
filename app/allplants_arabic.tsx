import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

// Plant interface
interface Plant {
  _id: string;
  name: string;
}

// Plant images map (Assuming these paths are correct in your assets folder)
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

// Arabic name translations
const arabicNames: Record<string, string> = {
  apple: 'تفاح',
  barley: 'شعير',
  basil: 'ريحان',
  blueberry: 'توت أزرق',
  cherry: 'كرز',
  corn: 'ذرة',
  cucumber: 'خيار',
  grape: 'عنب',
  lettuce: 'خس',
  mint: 'نعناع',
  nettle: 'قُرّيص',
  oats: 'شوفان',
  orange: 'برتقال',
  'pepper bell': 'فلفل رومي',
  rice: 'أرز',
  thyme: 'زعتر',
  tomato: 'طماطم',
  wheat: 'قمح',
  peach: 'خوخ',
};

const defaultImage = require('assets/images/wheat.jpg');

const { width } = Dimensions.get('window');

export default function AllPlants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch all plants
    fetch('https://7787-41-43-3-74.ngrok-free.app/plant_arabics')
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching plants:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>جميع النباتات</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const key = item.name.toLowerCase();
          const plantImage = plantImages[key] || defaultImage;
          const arabicName = arabicNames[key] || item.name;

          return (
            <TouchableOpacity
              style={styles.card}
              // FIX: Change navigation path to plural "plant_arabics"
              onPress={() => router.push(`/plant_arabics/${item._id}`)}
            >
              <Image source={plantImage} style={styles.plantImage} />
              <Text style={styles.plantName}>{arabicName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fff7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  plantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  plantName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#388e3c',
    textTransform: 'capitalize',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
