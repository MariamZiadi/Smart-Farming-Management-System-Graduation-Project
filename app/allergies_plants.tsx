import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For arrow icons

import plant1 from '../assets/images/babys-breath.jpg';
import plant2 from '../assets/images/Hyacinth.jpg';
import plant3 from '../assets/images/poision oak.jpg';
import plant4 from '../assets/images/ragweed.jpg';
import plant5 from '../assets/images/nettle.jpg';

const plants = [
  {
    id: 1,
    name: "Baby's-breath",
    image: plant1,
    details: 'Circumstances: Sunny areas\nAvoidance: Wear gloves while handling.',
    watering: 'Water in 7 days',
  },
  {
    id: 2,
    name: 'Hyacinth',
    image: plant2,
    details: 'Circumstances: Requires watering twice a week\nAvoidance: Keep it out of reach.',
    watering: 'Water in 3 days',
  },
  {
    id: 3,
    name: 'Poison Oak',
    image: plant3,
    details: 'Circumstances: Sunny areas\nAvoidance: Wear gloves while handling.',
    watering: 'Water in 7 days',
  },
  {
    id: 4,
    name: 'Ragweed',
    image: plant4,
    details: 'Circumstances: Requires watering twice a week\nAvoidance: Keep it out of reach.',
    watering: 'Water in 3 days',
  },
  {
    id: 5,
    name: 'Nettle',
    image: plant5,
    details: 'Circumstances: Requires watering twice a week\nAvoidance: Keep it out of reach.',
    watering: 'Water in 3 days',
  },
];

const PlantAllergyPage = () => {
  const [expandedPlantId, setExpandedPlantId] = useState(null);

  const toggleDropdown = (plantId) => {
    setExpandedPlantId(expandedPlantId === plantId ? null : plantId);
  };

  return (
    <ImageBackground
      source={require('../assets/images/BG2.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Allergenic Plants</Text>
        {plants.map((plant) => (
          <View
            key={plant.id}
            style={[
              styles.card,
              expandedPlantId === plant.id && styles.expandedCard,
            ]}
          >
            <View style={styles.cardContent}>
              <Image source={plant.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.plantName}>{plant.name}</Text>
                <TouchableOpacity
                  onPress={() => toggleDropdown(plant.id)}
                  style={styles.detailsToggle}
                >
                  <Text style={styles.viewDetails}>
                    {expandedPlantId === plant.id ? 'Hide Details' : 'View Details'}
                  </Text>
                  <Icon
                    name={
                      expandedPlantId === plant.id
                        ? 'keyboard-arrow-up'
                        : 'keyboard-arrow-down'
                    }
                    size={23}
                    color="rgb(9, 71, 10)"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expandedPlantId === plant.id && (
              <View style={styles.details}>
                <Text style={styles.detailsHeader}>Additional Information</Text>
                <Text style={styles.detailsText}>{plant.details}</Text>
              </View>
            )}
          </View>
        ))}
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#fff',
  },
  scrollContainer: {
    top:50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  expandedCard: {
    marginBottom: 30, // Add extra space when expanded
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
  },
  info: {
    flex: 1,
    padding: 16,
  },
  plantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  detailsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetails: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
    marginRight: 4,
  },
  details: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  detailsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detailsText: {
    fontSize: 16,
    lineHeight: 20,
    color: 'black',
  },
});

export default PlantAllergyPage;
