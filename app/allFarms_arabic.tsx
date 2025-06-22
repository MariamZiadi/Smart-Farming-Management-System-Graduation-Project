import React, { useEffect, useState } from 'react';
import { useRouter, Link } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Crop = {
  name: string;
  addedAt: string;
};

type Farm = {
  _id: string;
  name: string;
  crops: Crop[];
  plainPassword: string;
};

// ✅ Crop translation dictionary
const cropTranslations: { [key: string]: string } = {
  "Strawberry": "فراولة",
  "Cucumber": "خيار",
  "Tomato": "طماطم",
  "Potato": "بطاطس",
  "Grapes": "عنب",
  "Peach": "خوخ",
  "Apple": "تفاح",
  "Mint": "نعناع",
  "Lettuce": "خس",
  "Orange": "برتقال",
  "Blueberry": "توت",
  "Pepper bell": "فلفل",
  "Basil": "ريحان",
  "Thyme": "زعتر",
  "Wheat": "قمح",
  "Barley": "شعير",
  "Rice": "أرز",
  "Oats": "شوفان",
  "Grape": "عنب", // in case singular is used separately from "Grapes"
};


// ✅ Translation helper function
const getArabicName = (name: string): string => {
  return cropTranslations[name] || name;
};

const AllFarmsPage = () => {
  const router = useRouter();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFarms = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setError("غير مصرح: لا يوجد رمز مميز");
        return;
      }

      const response = await axios.get("https://c3c0-102-45-148-78.ngrok-free.app/farms/my-farms", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const farmsData: Farm[] = response.data.farms;
      setFarms(farmsData);
      setError(null);
    } catch (err) {
      console.error("خطأ في جلب المزارع:", err);
      setError("حدث خطأ أثناء جلب المزارع");
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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
          farms.map((farm) => (
            <View key={farm._id} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.info}>
                  <Text style={styles.plantName}>{farm.name}</Text>
                  <Text style={styles.farmPassword}>رمز المرور: {farm.plainPassword}</Text>
                  <View style={styles.details}>
                    <Text style={styles.detailsHeader}>المحاصيل</Text>
                    <Text style={styles.detailsText}>
                      {farm.crops.length > 0
                        ? farm.crops.map((crop) => getArabicName(crop.name)).join("، ")
                        : "لا توجد محاصيل"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noFarmsText}>لا توجد مزارع مسجلة</Text>
        )}

        <Link href="./add_farm_arabic" style={styles.addFarmButton}>
          <Text style={styles.addFarmButtonText}>إضافة مزرعة جديدة</Text>
        </Link>
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
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: 'white',
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
  info: { flex: 1 },
  plantName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  farmPassword: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  details: { paddingTop: 8 },
  detailsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2e7d32',
  },
  detailsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1b5e20',
  },
  noFarmsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  addFarmButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 50,
    marginTop: 15,
    marginBottom: 40,
  },
  addFarmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default AllFarmsPage;
