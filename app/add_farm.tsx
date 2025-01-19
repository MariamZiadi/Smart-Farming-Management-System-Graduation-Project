import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';



export default function AddFarmPage() {
  const [plants, setPlants] = useState([{ name: '', key: 'Plant 1' }]);
  const [farmName, setFarmName] = useState('');
  const [farmPassword, setFarmPassword] = useState('');
  const plantSuggestions = ['Tomato', 'Potato', 'Cucumber', 'Carrot', 'Lettuce'];

  const addPlantField = () => {
    setPlants([...plants, { name: '', key: `Plant ${plants.length + 1}` }]);
  };

  const updatePlantName = (index, name) => {
    const updatedPlants = [...plants];
    updatedPlants[index].name = name;
    setPlants(updatedPlants);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{item.key}</Text>
      <View style={styles.row}>
        <Autocomplete
          data={item.name
            ? plantSuggestions.filter((suggestion) =>
                suggestion.toLowerCase().includes(item.name.toLowerCase())
              )
            : []
          }
          defaultValue={item.name}
          onChangeText={(text) => updatePlantName(index, text)}
          placeholder={`Enter ${item.key.toLowerCase()}`}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={styles.input}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => updatePlantName(index, item)}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        {index === plants.length - 1 && (
          <TouchableOpacity style={styles.addPlantButton} onPress={addPlantField}>
            <Text style={styles.addPlantButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  const router = useRouter();

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
          {/* Farm Name Field */}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Farm Name</Text>
            <TextInput
              style={styles.input}
              value={farmName}
              onChangeText={setFarmName}
              placeholder="Enter farm name"
            />
          </View>

          {/* Farm Password Field */}
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

          {/* Plant Fields */}
          <FlatList
            data={[...plants, { isFooter: true }]} 
            renderItem={({ item, index }) =>
              item.isFooter ? (
                <TouchableOpacity style={styles.addFarmButton}>
                  <Text style={styles.addFarmButtonText}>Add Farm</Text>
                </TouchableOpacity>
              ) : (
                renderItem({ item, index })
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
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
  autocompleteContainer: {
    flex: 1,
  },
  suggestionText: {
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
});
