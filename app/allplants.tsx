import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

interface Plant {
  _id: string;
  name: string;
}

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

const plantCategories: Record<string, 'Fruit' | 'Vegetable' | 'Herb' | 'Grain'> = {
  apple: 'Fruit',
  orange: 'Fruit',
  blueberry: 'Fruit',
  grape: 'Fruit',
  peach: 'Fruit',
  cherry: 'Fruit',

  tomato: 'Vegetable',
  cucumber: 'Vegetable',
  corn: 'Vegetable',
  lettuce: 'Vegetable',
  'pepper bell': 'Vegetable',

  basil: 'Herb',
  mint: 'Herb',
  thyme: 'Herb',
  nettle: 'Herb',

  wheat: 'Grain',
  barley: 'Grain',
  oats: 'Grain',
  rice: 'Grain',
};

const defaultImage = require('assets/images/wheat.jpg');
const bgImage = require('../assets/images/BG3.jpg');

export default function AllPlants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Fruit' | 'Vegetable' | 'Herb' | 'Grain'>('All');
  const router = useRouter();

  useEffect(() => {
    fetch('https://cad5-102-45-148-78.ngrok-free.app/plants')
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

  const filteredPlants =
    selectedCategory === 'All'
      ? plants
      : plants.filter(
          (plant) => plantCategories[plant.name.toLowerCase()] === selectedCategory
        );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>All Plants</Text>

        <View style={styles.filterContainer}>
          {['All', 'Fruit', 'Vegetable', 'Herb', 'Grain'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterButton,
                selectedCategory === cat && styles.activeFilterButton,
              ]}
              onPress={() => setSelectedCategory(cat as any)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat && styles.activeFilterText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const plantKey = item.name.toLowerCase();
            const plantImage = plantImages[plantKey] || defaultImage;

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/plant/${item._id}`)}
              >
                <Image source={plantImage} style={styles.plantImage} />
                <Text style={styles.plantName}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  filterContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
  alignItems: 'center',
},
filterButton: {
  paddingHorizontal: 10,
  paddingVertical: 6,
  backgroundColor: '#eee',
  borderRadius: 20,
  marginHorizontal: 4,
  minWidth: 65,
  alignItems: 'center',
},
  activeFilterButton: {
    backgroundColor: 'rgb(9, 71, 10)',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffee',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#cdeac0',
  },
  plantImage: {
    width: 65,
    height: 65,
    borderRadius: 30,
    marginRight: 14,
    borderWidth: 2,
    borderColor: 'rgb(9, 71, 10)',
  },
  plantName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e7d32',
    textTransform: 'capitalize',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
