import React, { useEffect, useState } from 'react';
import { useRouter, Link } from 'expo-router';
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

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Crop = {
  name: string;
};

type Farm = {
  _id: string;
  name: string;
  crops: Crop[];
  plainPassword: string; // added to receive from backend
};

const AllFarmsPage = () => {
  const router = useRouter();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFarms = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setError("Unauthorized: No token found");
        return;
      }

      const response = await axios.get("https://7aec-41-43-3-74.ngrok-free.app/farms/my-farms", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.message) {
        setError(response.data.message);
        setFarms([]);
      } else {
        setFarms(response.data.farms);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching farms:", error);
      setError("Failed to fetch farms");
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

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

        {error ? (
          <Text style={styles.noFarmsText}>{error}</Text>
        ) : farms.length > 0 ? (
          farms.map((farm) => (
            <View key={farm._id} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.info}>
                  <Text style={styles.plantName}>{farm.name}</Text>
                  <Text style={styles.farmPassword}>Password: {farm.plainPassword}</Text>

                  <View style={styles.details}>
                    <Text style={styles.detailsHeader}>Plants</Text>
                    <Text style={styles.detailsText}>
                      {farm.crops.length > 0
                        ? farm.crops.map(crop => crop.name).join(", ")
                        : "No crops listed"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noFarmsText}>No farms found.</Text>
        )}

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
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: 'rgb(254, 254, 253)',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  noFarmsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  scrollContainer: {
    top: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardContent: {
    gap: 12,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  plantName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#2e7d32',
  },
  farmPassword: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  details: {
    marginTop: 6,
    backgroundColor: '#f1f8e9',
    borderRadius: 10,
    padding: 10,
  },
  detailsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#33691e',
    lineHeight: 22,
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
  addFarmButton: {
    marginTop: 20,
    backgroundColor: 'rgb(9, 71, 10)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
  },
  addFarmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AllFarmsPage;
