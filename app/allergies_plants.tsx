import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const plants = [
  {
    id: 1,
    name: "Baby's-breath",
    image: require('../assets/images/babys-breath.jpg'),
    circumstances: 'Thrives in full sun with well-drained soil; drought-tolerant.',
    avoidance: 'Wear gloves when handling.',
    allergenic: 'Contains saponins that can cause skin irritation or trigger mild asthma in sensitive individuals.',
  },
  {
    id: 2,
    name: 'Hyacinth',
    image: require('../assets/images/Hyacinth.jpg'),
    circumstances: 'Water every 7–14 days; prefers full to partial sun.',
    avoidance: 'Wear gloves and keep away from children/pets.',
    allergenic: 'Bulbs cause skin irritation (contact dermatitis); toxic if ingested, especially to pets.',
  },
  {
    id: 3,
    name: 'Poison Oak',
    image: require('../assets/images/poision oak.jpg'),
    circumstances: 'Grows in sunny to shaded areas; no watering needed.',
    avoidance: 'Wear full protective gear and avoid contact.',
    allergenic: 'Releases urushiol oil that causes severe allergic skin rash (contact dermatitis).',
  },
  {
    id: 4,
    name: 'Ragweed',
    image: require('../assets/images/ragweed.jpg'),
    circumstances: 'Thrives in dry soil; no watering required.',
    avoidance: 'Avoid exposure during pollen season.',
    allergenic: 'Produces airborne pollen that causes hay fever, sneezing, and allergic rhinitis.',
  },
  {
    id: 5,
    name: 'Nettle',
    image: require('../assets/images/nettle.jpg'),
    circumstances: 'Prefers moist, rich soil.',
    avoidance: 'Wear gloves; wash skin after contact.',
    allergenic: 'Stinging hairs inject histamine and other irritants, causing a burning rash.',
  },
  {
    id: 6,
    name: 'Oleander',
    image: require('../assets/images/oleander.jpg'),
    circumstances: 'Needs full sun and moderate watering.',
    avoidance: 'Keep away from children and pets; wear gloves.',
    allergenic: 'Extremely toxic—can cause heart issues if ingested; even touching sap may irritate skin.',
  },
  {
    id: 7,
    name: 'Foxglove',
    image: require('../assets/images/foxglove.jpg'),
    circumstances: 'Prefers partial shade, moist soil.',
    avoidance: 'Handle with care; do not ingest.',
    allergenic: 'All parts contain cardiac glycosides—highly poisonous if consumed.',
  },
  {
    id: 8,
    name: 'Castor Bean',
    image: require('../assets/images/castor-bean.jpg'),
    circumstances: 'Requires full sun; grows in warm climates.',
    avoidance: 'Avoid handling seeds; do not grow in accessible areas.',
    allergenic: 'Seeds contain ricin—one of the most toxic naturally occurring substances.',
  },
  {
    id: 9,
    name: 'Poinsettia',
    image: require('../assets/images/poinsettia.jpg'),
    circumstances: 'Needs bright, indirect light; light watering.',
    avoidance: 'Wash hands after contact.',
    allergenic: 'Sap may cause mild skin irritation or nausea if ingested; not as toxic as once believed.',
  },
];

const PlantAllergyPage = () => {
  const router = useRouter();
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
        <Ionicons
          name="arrow-back"
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./homepage')}
        />
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
                <Text style={styles.detailsHeader}>Circumstances</Text>
                <Text style={styles.detailsText}>{plant.circumstances}</Text>

                <Text style={styles.detailsHeader}>Avoidance</Text>
                <Text style={styles.detailsText}>{plant.avoidance}</Text>

                <Text style={styles.detailsHeader}>Allergenic/Toxicity</Text>
                <Text style={styles.detailsText}>{plant.allergenic}</Text>
              </View>
            )}
          </View>
        ))}
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
        <Link href="./allFarms">
          <Icon name="local-florist" size={30} color="#000" />
        </Link>
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
    marginLeft: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#fff',
  },
  scrollContainer: {
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
    marginBottom: 30,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: 'rgb(9, 71, 10)',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
    paddingVertical: 10,
  },
});

export default PlantAllergyPage;
