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
  I18nManager,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Ensure RTL direction
I18nManager.allowRTL(true);

export default function AddFarmPageArabic() {
  const [plants, setPlants] = useState([{ name: '', key: 'النبتة 1' }]);
  const [farmName, setFarmName] = useState('');
  const [farmPassword, setFarmPassword] = useState('');

  const plantSuggestions = [
    'تفاح',
    'شعير',
    'ريحان',
    'توت',
    'كرز',
    'ذرة',
    'خيار',
    'عنب',
    'خس',
    'نعناع',
    'قراص',
    'شوفان',
    'برتقال',
    'فلفل حلو',
    'أرز',
    'زعتر',
    'طماطم',
    'قمح',
    'خوخ',
    'بطاطس',
    'جزر',
  ];

  const addPlantField = () => {
    setPlants([...plants, { name: '', key: `النبتة ${plants.length + 1}` }]);
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
          data={
            item.name
              ? plantSuggestions.filter((suggestion) =>
                  suggestion.toLowerCase().includes(item.name.toLowerCase())
                )
              : []
          }
          defaultValue={item.name}
          onChangeText={(text) => updatePlantName(index, text)}
          placeholder={`أدخل ${item.key}`}
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
          name="arrow-forward" // Reversed for RTL
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./allFarms')}
        />

        <Text style={styles.title}>أضف مزرعتك الجديدة</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Farm Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>اسم المزرعة</Text>
            <TextInput
              style={styles.input}
              value={farmName}
              onChangeText={setFarmName}
              placeholder="أدخل اسم المزرعة"
              textAlign="right"
            />
          </View>

          {/* Farm Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>كلمة مرور المزرعة</Text>
            <TextInput
              style={styles.input}
              value={farmPassword}
              onChangeText={setFarmPassword}
              placeholder="أدخل كلمة المرور"
              secureTextEntry
              textAlign="right"
            />
          </View>

          {/* Plant Fields */}
          <FlatList
            data={[...plants, { isFooter: true }]}
            renderItem={({ item, index }) =>
              item.isFooter ? (
                <TouchableOpacity style={styles.addFarmButton}>
                  <Text style={styles.addFarmButtonText}>أضف المزرعة</Text>
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
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 32,
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
    textAlign: 'right',
  },
  input: {
    height: 50,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  addPlantButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    height: 50,
    width: 50,
    marginRight: 10,
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
    textAlign: 'right',
  },
});
