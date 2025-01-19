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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 


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
      <View style={styles.bottomNav}>
              <Link href="./homepage">
                <Icon name="home" size={30} color="#000" />
              </Link>
              <Link href="./profile">
                <Icon name="person" size={30} color="#000" />
              </Link>
              <Link href="./disease_detection">
                <Icon2 name="leaf" size={30} color="#000" />
              </Link>
              <Link href="./feed">
                <Icon2 name="file-document-outline" size={30} color="#000" />
              </Link>
               <View style={[styles.iconContainer, styles.shadow]}>
                <Link href="./allFarms">
                <Icon name="local-florist" size={30} color="#000" />
              </Link>
              </View>
              
            </View>
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
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: 'rgb(254, 254, 253)',
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
    fontSize: 22,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'rgb(9, 71, 10)',
  },
  detailsText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'semibold',
    color: 'rgb(9, 71, 10)',
  },
  
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 40, 
    backgroundColor: 'white', 
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, 
  },
  navItem: {
    fontSize: 24,
  },
});

export default allFarmsPage;
