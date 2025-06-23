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
  I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const cropTranslations: Record<string, string> = {
  apple: 'تفاح',
  barley: 'شعير',
  basil: 'ريحان',
  blueberry: 'توت أزرق',
  cherry: 'كرز',
  corn: 'ذرة',
  cucumber: 'خيار',
  grape: 'عنب',
  lettuce: 'خس',
  mint: 'نعناع',
  nettle: 'قُرّيص',
  oats: 'شوفان',
  orange: 'برتقال',
  'pepper bell': 'فلفل رومي',
  rice: 'أرز',
  thyme: 'زعتر',
  tomato: 'طماطم',
  wheat: 'قمح',
  peach: 'خوخ',
};

type Crop = { name: string };
type Farm = {
  _id: string;
  name: string;
  crops: Crop[];
  plainPassword: string;
};

const AllFarmsPageArabic = () => {
  const router = useRouter();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCrop, setNewCrop] = useState('');
  const [updatedCrops, setUpdatedCrops] = useState<string[]>([]);

  const fetchFarms = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`https://2c7d-102-45-148-78.ngrok-free.app/farms/my-farms`, {
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
      console.error('Error fetching farms:', error);
      setError('فشل في تحميل المزارع');
    }
  };

  const handleDelete = async (farmId: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete(`https://2c7d-102-45-148-78.ngrok-free.app/farms/${farmId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFarms();
    } catch (err) {
      console.error('فشل في حذف المزرعة', err);
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
      const token = await AsyncStorage.getItem('userToken');
      await axios.put(
        `https://2c7d-102-45-148-78.ngrok-free.app/farms/${currentFarm._id}`,
        {
          name: newName,
          password: newPassword,
          crops: updatedCrops,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditModalVisible(false);
      fetchFarms();
    } catch (err) {
      console.error('فشل في تعديل المزرعة', err);
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
          <Ionicons
            name="arrow-back"
            size={27}
            color="white"
            style={styles.backIcon}
            onPress={() => router.push('./homepage_arabic')}
          />
          <Text style={styles.title}>جميع مزارعك</Text>

          {error ? (
            <Text style={styles.noFarmsText}>{error}</Text>
          ) : farms.length > 0 ? (
            farms.map(farm => (
              <View key={farm._id} style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={() => openEditModal(farm)} style={{ marginRight: 10 }}>
                    <Ionicons name="create" size={24} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(farm._id)}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.plantName}>{farm.name}</Text>
                  <Text style={styles.farmPassword}>كلمة المرور: {farm.plainPassword}</Text>
                  <View style={styles.details}>
                    <Text style={styles.detailsHeader}>المحاصيل</Text>
                    <Text style={styles.detailsText}>
                      {farm.crops.length > 0
                      ? farm.crops.map(crop => cropTranslations[crop.name.toLowerCase()] || crop.name).join('، ')
                      : 'لا توجد محاصيل'}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noFarmsText}>لم يتم العثور على مزارع.</Text>
          )}

          <Link href="./add_farm_arabic" style={styles.addFarmButton}>
            <Text style={styles.addFarmButtonText}>إضافة مزرعة جديدة</Text>
          </Link>

          <Modal visible={editModalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.title}>تعديل المزرعة</Text>
                <TextInput
                  value={newName}
                  onChangeText={setNewName}
                  style={styles.input}
                  placeholder="اسم المزرعة"
                />
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={styles.input}
                  placeholder="كلمة المرور"
                />
                <Picker selectedValue={newCrop} onValueChange={setNewCrop} style={styles.input}>
                  {Object.entries(cropTranslations).map(([eng, ar]) => (
                    <Picker.Item key={eng} label={ar} value={eng} />
                  ))}
                </Picker>
                <TouchableOpacity onPress={handleCropAdd} style={styles.addFarmButton}>
                  <Text style={styles.addFarmButtonText}>إضافة المحصول</Text>
                </TouchableOpacity>
                <ScrollView>
                  {updatedCrops.map(crop => (
                    <View
                      key={crop}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}
                    >
                      <Text>{cropTranslations[crop.toLowerCase()] || crop}</Text>
                      <TouchableOpacity onPress={() => handleCropRemove(crop)}>
                        <Text style={{ color: 'red' }}>إزالة</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity onPress={handleEditSave} style={styles.addFarmButton}>
                  <Text style={styles.addFarmButtonText}>حفظ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>إلغاء</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Link href="./homepage_arabic">
          <Icon name="home" size={30} color="#000" />
        </Link>
        <Link href="./profile_arabic">
          <Icon name="person" size={30} color="#000" />
        </Link>
        <Link href="./disease_detection_arabic">
          <Icon2 name="leaf" size={30} color="#000" />
        </Link>
        <Link href="./feed_arabic">
          <Icon2 name="file-document-outline" size={30} color="#000" />
        </Link>
        <View style={[styles.iconContainer, styles.shadow]}>
          <Link href="./allFarms_arabic">
            <Icon name="local-florist" size={30} color="#000" />
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { paddingBottom: 20, paddingHorizontal: 16 },
  backIcon: {
    padding: 10,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: { marginTop: 10 },
  plantName: { fontSize: 24, fontWeight: '700', color: '#2e7d32' },
  farmPassword: { fontSize: 16, fontWeight: '600', color: '#2e7d32', marginBottom: 8 },
  details: {
    backgroundColor: '#f1f8e9',
    borderRadius: 10,
    padding: 10,
  },
  detailsHeader: { fontSize: 16, fontWeight: '600', color: '#1b5e20', marginBottom: 4 },
  detailsText: { fontSize: 15, fontWeight: '500', color: '#33691e', lineHeight: 22 },
  addFarmButton: {
    marginTop: 20,
    backgroundColor: 'rgb(9, 71, 10)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
  },
  addFarmButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
    paddingVertical: 10,
  },
  iconContainer: { padding: 10, borderRadius: 40, backgroundColor: 'white' },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
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
    fontSize: 16,
  },
});

export default AllFarmsPageArabic;
