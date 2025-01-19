import React from 'react';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const plants = [
  {
    id: 1,
    name: "Farm 1",
    details: 'Potato, Grape',
  },
  {
    id: 2,
    name: 'Farm 2',
    details: 'Strawberry, Peach',
  },
  {
    id: 3,
    name: 'Farm 3',
    details: 'Apple, Cherry, Tomato',
  },
];

const allFarmsPage = () => {
    const router = useRouter();

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
        <Ionicons
          name="arrow-back"
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./homepage')} 
        />
        <Text style={styles.title}>All your farms</Text>
        {plants.map((plant) => (
          <View key={plant.id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.info}>
                <Text style={styles.plantName}>{plant.name}</Text>
                <View style={styles.details}>
                  <Text style={styles.detailsHeader}>Plants</Text>
                  <Text style={styles.detailsText}>{plant.details}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        <Link href="./add_farm" style={styles.addFarmButton}>
          <Text style={styles.addFarmButtonText}>Add New Farm</Text>
        </Link>
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
  backIcon: {
    marginLeft: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#fff',
  },
  scrollContainer: {
    top: 40,
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  info: {
    flex: 1,
  },
  plantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  addFarmButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 50,
    marginTop: 5,
    marginBottom: 30,
  },
  addFarmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    paddingTop: 8,
    backgroundColor: 'white',
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

export default allFarmsPage;
