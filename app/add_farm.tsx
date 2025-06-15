import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ correct import


type PlantItem = {
  name: string;
  key: string;
};

export default function AddFarmPage() {
  const [plants, setPlants] = useState<PlantItem[]>([{ name: '', key: 'Plant 1' }]);
  const [farmName, setFarmName] = useState('');
  const [farmPassword, setFarmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const plantSuggestions: string[] = [
    'Apple', 'Barley', 'Basil', 'Blueberry', 'Cherry', 'Corn', 'Cucumber',
    'Grape', 'Lettuce', 'Mint', 'Nettle', 'Oats', 'Orange', 'Pepper Bell',
    'Rice', 'Thyme', 'Tomato', 'Wheat', 'Peach', 'Potato', 'Carrot'
  ];

useFocusEffect(
  React.useCallback(() => {
    const fetchToken = async () => {
      console.log('🔄 Refetching token on screen focus');
      const storedToken = await AsyncStorage.getItem('userToken');
      console.log('🔐 Token retrieved in AddFarm:', storedToken);
      setToken(storedToken);
    };

    fetchToken();
  }, [])
);


  const addPlantField = () => {
    setPlants([...plants, { name: '', key: `Plant ${plants.length + 1}` }]);
  };

  const updatePlantName = (index: number, name: string) => {
    const updatedPlants = [...plants];
    updatedPlants[index].name = name;
    setPlants(updatedPlants);
  };

  const handleAddFarm = async () => {
    try {
      setLoading(true);

      if (!token) {
        Alert.alert('Authentication Error', 'User not authenticated. Please log in again.');
        return;
      }

      const cropNames = plants.filter(p => p.name.trim()).map(p => ({ name: p.name.trim() }));

      const response = await axios.post(
        'https://ed24-41-43-3-74.ngrok-free.app/farms/create',
        {
          name: farmName,
          password: farmPassword,
          crops: cropNames,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('✅ Success', response.data.message || 'Farm added successfully.');
      router.replace('./allFarms');
    } catch (error: any) {
      console.error('❌ Farm creation error:', error?.response || error);
      Alert.alert('Error', error?.response?.data?.message || 'Could not add farm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../assets/images/BG2.jpg')}
        style={styles.background}
      >
        <View style={styles.overlay} />
        <Ionicons
          name="arrow-back"
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./allFarms')}
        />

        <Text style={styles.title}>Add Your New Farm</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Farm Name</Text>
            <TextInput
              style={styles.input}
              value={farmName}
              onChangeText={setFarmName}
              placeholder="Enter farm name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Farm Password</Text>
            <TextInput
              style={styles.input}
              value={farmPassword}
              onChangeText={setFarmPassword}
              placeholder="Enter farm password"
              secureTextEntry
            />
          </View>

          {plants.map((plant, index) => (
            <View key={plant.key} style={styles.inputContainer}>
              <Text style={styles.label}>{plant.key}</Text>
              <View style={styles.row}>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={plant.name}
                    onValueChange={(value) => updatePlantName(index, value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select a plant" value="" />
                    {plantSuggestions.map((suggestion, idx) => (
                      <Picker.Item key={idx} label={suggestion} value={suggestion} />
                    ))}
                  </Picker>
                </View>
                {index === plants.length - 1 && (
                  <TouchableOpacity style={styles.addPlantButton} onPress={addPlantField}>
                    <Text style={styles.addPlantButtonText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addFarmButton} onPress={handleAddFarm}>
            <Text style={styles.addFarmButtonText}>
              {loading ? 'Adding...' : 'Add Farm'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backIcon: {
    marginTop: 40,
    marginLeft: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  addPlantButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    height: 50,
    width: 50,
    marginLeft: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlantButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addFarmButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 30,
  },
  addFarmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
