import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link, Stack } from 'expo-router';
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
      name: "نَفَس الطفل",
      image: require('../assets/images/babys-breath.jpg'),
      details: 'الظروف: مناطق مشمسة\nتجنب: ارتداء القفازات أثناء التعامل.',
      watering: 'يُسقى خلال 7 أيام',
    },
    {
      id: 2,
      name: 'الزنبق',
      image: require('../assets/images/Hyacinth.jpg'),
      details: 'الظروف: يحتاج إلى السقي مرتين في الأسبوع\nتجنب: يُحفظ بعيداً عن متناول اليد.',
      watering: 'يُسقى خلال 3 أيام',
    },
    {
      id: 3,
      name: 'بلوط سام',
      image: require('../assets/images/poision oak.jpg'),
      details: 'الظروف: مناطق مشمسة\nتجنب: ارتداء القفازات أثناء التعامل.',
      watering: 'يُسقى خلال 7 أيام',
    },
    {
      id: 4,
      name: 'عشبة الرجيد',
      image: require('../assets/images/ragweed.jpg'),
      details: 'الظروف: يحتاج إلى السقي مرتين في الأسبوع\nتجنب: يُحفظ بعيداً عن متناول اليد.',
      watering: 'يُسقى خلال 3 أيام',
    },
    {
      id: 5,
      name: 'القُرّيص',
      image: require('../assets/images/nettle.jpg'),
      details: 'الظروف: يحتاج إلى السقي مرتين في الأسبوع\nتجنب: يُحفظ بعيداً عن متناول اليد.',
      watering: 'يُسقى خلال 3 أيام',
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
            onPress={() => router.push('./homepage_arabic')} 
          />
          <Text style={styles.title}>النباتات المسببة للحساسية</Text>
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
                      {expandedPlantId === plant.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
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
                  <Text style={styles.detailsHeader}>معلومات إضافية</Text>
                  <Text style={styles.detailsText}>{plant.details}</Text>
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
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#fff',
  },
  scrollContainer: {
    top:40,
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
    marginBottom: 8,
    color: 'rgb(9, 71, 10)',
  },
  detailsText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'semibold',
    color: 'rgb(9, 71, 10)',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
    paddingVertical: 10,
  },
  navItem: {
    fontSize: 24,
  },
});

export default PlantAllergyPage;
