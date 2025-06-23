import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Alert, I18nManager
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

I18nManager.allowRTL(true);

type Plant = {
  _id: string;
  name: string;
  arabicName: string;
};

type PlantSelection = {
  selectedArabicName: string;
  key: string;
};

export default function AddFarmPageAr() {
  const [plantsData, setPlantsData] = useState<Plant[]>([]);
  const [selections, setSelections] = useState<PlantSelection[]>([{ selectedArabicName: '', key: 'النبتة 1' }]);
  const [farmName, setFarmName] = useState('');
  const [farmPassword, setFarmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const arabicTranslationMap: Record<string, string> = {
    'Apple': 'تفاح', 'Barley': 'شعير', 'Basil': 'ريحان', 'Blueberry': 'توت',
    'Strawberry': 'فراولة', 'Cucumber': 'خيار', 'Grape': 'عنب', 'Lettuce': 'خس',
    'Mint': 'نعناع', 'Oats': 'شوفان', 'Orange': 'برتقال', 'Pepper Bell': 'فلفل',
    'Rice': 'أرز', 'Thyme': 'زعتر', 'Tomato': 'طماطم', 'Wheat': 'قمح',
    'Peach': 'خوخ', 'Potato': 'بطاطس'
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchTokenAndPlants = async () => {
        const storedToken = await AsyncStorage.getItem('userToken');
        setToken(storedToken);

        const res = await axios.get('https://fbfb-102-45-148-78.ngrok-free.app/plants');
        const mapped = res.data.map((plant: any) => ({
          _id: plant._id,
          name: plant.name,
          arabicName: arabicTranslationMap[plant.name] || plant.name
        }));
        setPlantsData(mapped);
      };
      fetchTokenAndPlants();
    }, [])
  );

  const addPlantField = () => {
    setSelections([...selections, { selectedArabicName: '', key: `النبتة ${selections.length + 1}` }]);
  };

  const updatePlantSelection = (index: number, arabicName: string) => {
    const updated = [...selections];
    updated[index].selectedArabicName = arabicName;
    setSelections(updated);
  };

  const handleAddFarm = async () => {
    try {
      setLoading(true);
      if (!token) {
        Alert.alert('خطأ في المصادقة', 'المستخدم غير مسجل الدخول. الرجاء تسجيل الدخول مجددًا.');
        return;
      }

      const selectedCrops = selections
        .filter(p => p.selectedArabicName)
        .map(p => p.selectedArabicName);

      const response = await axios.post(
        'https://fbfb-102-45-148-78.ngrok-free.app/farms/create',
        {
          name: farmName,
          password: farmPassword,
          crops: selectedCrops,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('✅ تم بنجاح', response.data.message || 'تمت إضافة المزرعة بنجاح.');
      router.replace('./allFarms_arabic');
    } catch (error: any) {
      console.error('❌ خطأ في إنشاء المزرعة:', error?.response || error);
      Alert.alert('خطأ', error?.response?.data?.message || 'لم يتمكن من إضافة المزرعة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
        <View style={styles.overlay} />
        <Ionicons
          name="arrow-back"
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./allFarms_arabic')}
        />
        <Text style={styles.title}>أضف مزرعتك الجديدة</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>اسم المزرعة</Text>
            <TextInput
              style={styles.input}
              value={farmName}
              onChangeText={setFarmName}
              placeholder="أدخل اسم المزرعة"
              placeholderTextColor="#888"
              textAlign="right"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>كلمة مرور المزرعة</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputWithIcon}
                placeholder="أدخل كلمة المرور"
                placeholderTextColor="#888"
                value={farmPassword}
                onChangeText={setFarmPassword}
                secureTextEntry={!showPassword}
                textAlign="right"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Icon2 name={showPassword ? 'eye-off' : 'eye'} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {selections.map((plant, index) => (
            <View key={plant.key} style={styles.inputContainer}>
              <Text style={styles.label}>{plant.key}</Text>
              <View style={styles.row}>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={plant.selectedArabicName}
                    onValueChange={(value) => updatePlantSelection(index, value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="اختر نبتة" value="" />
                    {plantsData.map((p, idx) => (
                      <Picker.Item key={idx} label={p.arabicName} value={p.arabicName} />
                    ))}
                  </Picker>
                </View>
                {index === selections.length - 1 && (
                  <TouchableOpacity style={styles.addPlantButton} onPress={addPlantField}>
                    <Text style={styles.addPlantButtonText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addFarmButton} onPress={handleAddFarm}>
            <Text style={styles.addFarmButtonText}>{loading ? 'جارٍ الإضافة...' : 'أضف المزرعة'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 20 },
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  backIcon: { marginTop: 40, marginLeft: 10 },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 20, marginBottom: 30 },
  inputContainer: { marginHorizontal: 20, marginBottom: 15 },
  label: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 6, textAlign: 'right' },
  input: { height: 50, fontSize: 16, color: '#000', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, textAlign: 'right' },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 8, height: 50, paddingHorizontal: 10 },
  inputWithIcon: { flex: 1, fontSize: 16, color: "#000", textAlign: 'right' },
  eyeIcon: { paddingLeft: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  pickerWrapper: { flex: 1, backgroundColor: '#fff', borderRadius: 8 },
  picker: { height: 50, width: '100%' },
  addPlantButton: { backgroundColor: 'rgb(9, 71, 10)', height: 50, width: 50, marginLeft: 10, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  addPlantButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  addFarmButton: { backgroundColor: 'rgb(9, 71, 10)', paddingVertical: 12, borderRadius: 8, marginHorizontal: 50, marginTop: 20, marginBottom: 30 },
  addFarmButtonText: { color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
});
