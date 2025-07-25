import React, { useEffect, useState } from 'react';
import { useRouter, Link } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
const API_URL = "http://10.0.2.2:5000";


type Crop = { name: string };
type Farm = {
  _id: string;
  name: string;
  crops: Crop[];
  plainPassword: string;
};

const AllFarmsPage = () => {
  const router = useRouter();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCrop, setNewCrop] = useState('');
  const [updatedCrops, setUpdatedCrops] = useState<string[]>([]);

  const plantSuggestions: string[] = [
    'Apple', 'Barley', 'Basil', 'Blueberry', 'Strawberry', 'Cucumber',
    'Grape', 'Lettuce', 'Mint', 'Oats', 'Orange', 'Pepper Bell',
    'Rice', 'Thyme', 'Tomato', 'Wheat', 'Peach', 'Potato'
  ];

  const fetchFarms = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${API_URL}/farms/my-farms`, {
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

  const handleDelete = async (farmId: string) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    await axios.delete(`${API_URL}/farms/${farmId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFarms();
  } catch (err) {
    console.error("Failed to delete farm", err);
  }
};


  const openEditModal = (farm: Farm) => {
    setCurrentFarm(farm);
    setNewName(farm.name);
    setNewPassword(farm.plainPassword);
    setUpdatedCrops(farm.crops.map(crop => crop.name));
    setEditModalVisible(true);
  };

  const handleEditSave = async () => {
    if (!currentFarm) return;
    try {
      const token = await AsyncStorage.getItem("userToken");
      await axios.put(`${API_URL}/farms/${currentFarm._id}`, {
        name: newName,
        password: newPassword,
        crops: updatedCrops,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditModalVisible(false);
      fetchFarms();
    } catch (err) {
      console.error("Edit farm failed", err);
    }
  };

  const handleCropRemove = (cropName: string) => {
    setUpdatedCrops(updatedCrops.filter(crop => crop !== cropName));
  };

  const handleCropAdd = () => {
    if (newCrop && !updatedCrops.includes(newCrop)) {
      setUpdatedCrops([...updatedCrops, newCrop]);
      setNewCrop('');
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={{ paddingTop: 50 }}>
          <Ionicons name="arrow-back" size={27} color="white" style={styles.backIcon} onPress={() => router.push('./homepage')} />
          <Text style={styles.title}>All your farms</Text>

          {error ? (
            <Text style={styles.noFarmsText}>{error}</Text>
          ) : farms.length > 0 ? (
            farms.map((farm) => (
              <View key={farm._id} style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => openEditModal(farm)}
                    style={{ marginRight: 10 }}
                  >
                    <Ionicons name="create" size={24} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleDelete(farm._id)}
                  >
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
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
            ))
          ) : (
            <Text style={styles.noFarmsText}>No farms found.</Text>
          )}

          <Link href="./add_farm" style={styles.addFarmButton}>
            <Text style={styles.addFarmButtonText}>Add New Farm</Text>
          </Link>

          <Modal visible={editModalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.title}>Edit Farm</Text>
                <TextInput value={newName} onChangeText={setNewName} style={styles.input} placeholder="Farm Name" />
                <TextInput value={newPassword} onChangeText={setNewPassword} style={styles.input} placeholder="Password" />

                <Picker
                  selectedValue={newCrop}
                  onValueChange={(value) => setNewCrop(value)}
                  style={[styles.input, { height: 50 }]}
                >
                  <Picker.Item label="Select a plant to add" value="" />
                  {plantSuggestions.map((plant, idx) => (
                    <Picker.Item key={idx} label={plant} value={plant} />
                  ))}
                </Picker>

                <TouchableOpacity onPress={handleCropAdd} style={styles.addFarmButton}>
                  <Text style={styles.addFarmButtonText}>Add Crop</Text>
                </TouchableOpacity>

                <ScrollView style={{ maxHeight: 150 }}>
                  {updatedCrops.map(crop => (
                    <View key={crop} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                      <Text>{crop}</Text>
                      <TouchableOpacity onPress={() => handleCropRemove(crop)}>
                        <Text style={{ color: 'red' }}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity onPress={handleEditSave} style={styles.addFarmButton}>
                  <Text style={styles.addFarmButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Link href="./homepage"><Icon name="home" size={30} color="#000" /></Link>
        <Link href="./profile"><Icon name="person" size={30} color="#000" /></Link>
        <Link href="./disease_detection"><Icon2 name="leaf" size={30} color="#000" /></Link>
        <Link href="./feed"><Icon2 name="file-document-outline" size={30} color="#000" /></Link>
        <View style={[styles.iconContainer, styles.shadow]}>
          <Link href="./allFarms"><Icon name="local-florist" size={30} color="#000" /></Link>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxHeight: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
  },
  backIcon: {
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 15,
  },
  noFarmsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  scrollContainer: {
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
    marginTop: 10,
  },
  plantName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2e7d32',
  },
  farmPassword: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  details: {
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
    paddingVertical: 10,
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
