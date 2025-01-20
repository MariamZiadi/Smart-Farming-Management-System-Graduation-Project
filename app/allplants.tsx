import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useRouter } from 'expo-router';

const plants = {
  fruits: [
    { id: '1', name: 'Apple Plant', image: require('../assets/images/apple.png') },
    { id: '2', name: 'Orange Plant', image: require('../assets/images/orange.png') },
    { id: '3', name: 'Blueberry Plant', image: require('../assets/images/blueberry.jpg') },
    { id: '4', name: 'Peach Plant', image: require('../assets/images/fruit home page image.jpeg') },
  ],
  vegetables: [
    { id: '5', name: 'Pepper bell Plant', image: require('../assets/images/pepper.jpg') },
    { id: '6', name: 'Tomato Plant', image: require('../assets/images/tomato.jpg') },
    { id: '7', name: 'Cucumber Plant', image: require('../assets/images/cucumber.jpg') },
    { id: '8', name: 'Lettuce Plant', image: require('../assets/images/lettuce.jpg') },
  ],
  herbs: [
    { id: '9', name: 'Basil Plant', image: require('../assets/images/basil.jpg') },
    { id: '10', name: 'Mint Plant', image: require('../assets/images/mint.jpg') },
    { id: '11', name: 'Thyme Plant', image: require('../assets/images/thyme.jpg') },
    { id: '12', name: 'Rosemary Plant', image: require('../assets/images/rosemary.jpg') },
  ],
  grains: [
    { id: '13', name: 'Wheat Plant', image: require('../assets/images/wheat.jpg') },
    { id: '14', name: 'Rice Plant', image: require('../assets/images/rice.jpg') },
    { id: '15', name: 'Barley Plant', image: require('../assets/images/barley.jpeg') },
    { id: '16', name: 'Oats Plant', image: require('../assets/images/oats.jpg') },
  ],
};

const AllPlants = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const renderItem = ({ item }: { item: typeof plants.fruits[0] }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.plantName}>{item.name}</Text>
        <TouchableOpacity>
          <Text style={styles.viewDetails}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredPlants = selectedCategory
    ? plants[selectedCategory as keyof typeof plants]
    : [...plants.fruits, ...plants.vegetables, ...plants.herbs, ...plants.grains];

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={27}
        color="white"
        style={styles.backIcon}
        onPress={() => router.push('./homepage')}
      />
      <Text style={styles.header}>All plants</Text>

      {/* Category filter buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleCategoryChange('fruits')}>
          <Text style={styles.filterText}>Fruits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleCategoryChange('vegetables')}>
          <Text style={styles.filterText}>Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleCategoryChange('herbs')}>
          <Text style={styles.filterText}>Herbs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleCategoryChange('grains')}>
          <Text style={styles.filterText}>Grains</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleCategoryChange('')}>
          <Text style={styles.filterText}>Show All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPlants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <View style={[styles.iconContainer, styles.shadow]}>
          <Link href="./homepage">
            <Icon name="home" size={30} color="#000" />
          </Link>
        </View>
        <Link href="./profile">
          <Icon name="person" size={30} color="#000" />
        </Link>
        <Link href="./disease_detection">
          <Icon2 name="leaf" size={30} color="#000" />
        </Link>
        <Link href="./feed">
          <Icon2 name="file-document-outline" size={30} color="#000" />
        </Link>
        <Link href="./allFarms">
          <Icon name="local-florist" size={30} color="#000" />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  backIcon: {
    marginTop: 40,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    margin: 4,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardTextContainer: {
    flex: 1,
    padding: 16,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  viewDetails: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#D7E9D4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    fontSize: 24,
  },
});

export default AllPlants;
