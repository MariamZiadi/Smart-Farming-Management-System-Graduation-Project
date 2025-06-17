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
  I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Arabic data
const plants = [
  {
    id: 1,
    name: 'نَفَت الثلج',
    image: require('../assets/images/babys-breath.jpg'),
    circumstances: 'تنمو في الشمس الكاملة مع تربة جيدة التصريف؛ تتحمل الجفاف.',
    avoidance: 'يُنصح بارتداء القفازات عند التعامل معها.',
    allergenic: 'تحتوي على صابونين قد يسبب تهيج الجلد أو نوبات ربو خفيفة للأشخاص الحساسين.',
  },
  {
    id: 2,
    name: 'الزنبق',
    image: require('../assets/images/Hyacinth.jpg'),
    circumstances: 'تسقى كل 7-14 يومًا؛ تفضل الشمس الكاملة أو الجزئية.',
    avoidance: 'ارتدِ القفازات وأبعدها عن الأطفال والحيوانات.',
    allergenic: 'البصيلات قد تسبب التهاب الجلد؛ سامة عند البلع، خصوصًا للحيوانات.',
  },
  {
    id: 3,
    name: 'السُمّاق السام',
    image: require('../assets/images/poision oak.jpg'),
    circumstances: 'ينمو في مناطق مشمسة أو مظللة؛ لا يحتاج إلى سقاية.',
    avoidance: 'ارتدِ معدات واقية كاملة وتجنب الملامسة.',
    allergenic: 'يفرز زيت الأوروشيول الذي يسبب طفحًا جلديًا حادًا.',
  },
  {
    id: 4,
    name: 'الرجيد',
    image: require('../assets/images/ragweed.jpg'),
    circumstances: 'ينمو في التربة الجافة؛ لا يحتاج إلى سقاية.',
    avoidance: 'تجنب التعرض له خلال موسم حبوب اللقاح.',
    allergenic: 'ينتج حبوب لقاح تسبب حساسية الأنف والعطاس.',
  },
  {
    id: 5,
    name: 'القراص',
    image: require('../assets/images/nettle.jpg'),
    circumstances: 'يفضل التربة الرطبة والغنية.',
    avoidance: 'ارتدِ القفازات واغسل الجلد بعد الملامسة.',
    allergenic: 'شعيرات لاذعة تحقن الهستامين وتسبب حرقًا وطفحًا.',
  },
  {
    id: 6,
    name: 'الديفلة',
    image: require('../assets/images/oleander.jpg'),
    circumstances: 'تحتاج إلى شمس كاملة وري معتدل.',
    avoidance: 'أبعدها عن الأطفال والحيوانات؛ ارتدِ القفازات.',
    allergenic: 'شديدة السُمية—قد تسبب مشاكل قلبية عند البلع؛ حتى ملامسة العصارة تهيج الجلد.',
  },
  {
    id: 7,
    name: 'قفاز الثعلب',
    image: require('../assets/images/foxglove.jpg'),
    circumstances: 'يفضل الظل الجزئي والتربة الرطبة.',
    avoidance: 'تعامل معها بحذر؛ لا تبتلعها.',
    allergenic: 'جميع أجزائها تحتوي على مركبات سامة للقلب.',
  },
  {
    id: 8,
    name: 'نبات الخروع',
    image: require('../assets/images/castor-bean.jpg'),
    circumstances: 'يحتاج إلى شمس كاملة وينمو في المناخات الحارة.',
    avoidance: 'تجنب لمس البذور؛ لا تزرعها في أماكن يسهل الوصول إليها.',
    allergenic: 'البذور تحتوي على الريسين—من أكثر السموم الطبيعية فتكًا.',
  },
  {
    id: 9,
    name: 'البونسيتة',
    image: require('../assets/images/poinsettia.jpg'),
    circumstances: 'تحتاج إلى ضوء ساطع غير مباشر وسقاية خفيفة.',
    avoidance: 'اغسل يديك بعد ملامستها.',
    allergenic: 'عصارتها قد تسبب تهيجًا بسيطًا أو غثيانًا؛ ليست شديدة السمية كما كان يُعتقد.',
  },
];

const PlantAllergyPageArabic = () => {
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
          name="arrow-forward" // flipped due to RTL
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
                <Text style={styles.detailsHeader}>الظروف المناسبة</Text>
                <Text style={styles.detailsText}>{plant.circumstances}</Text>

                <Text style={styles.detailsHeader}>الاحتياطات</Text>
                <Text style={styles.detailsText}>{plant.avoidance}</Text>

                <Text style={styles.detailsHeader}>السمّية/الحساسية</Text>
                <Text style={styles.detailsText}>{plant.allergenic}</Text>
              </View>
            )}
          </View>
        ))}
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
        <Link href="./allFarms_arabic">
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
    marginRight: 10,
    marginTop: 40,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#fff',
    writingDirection: 'rtl',
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
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
    textAlign: 'right',
  },
  detailsToggle: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  viewDetails: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
    marginLeft: 4,
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
    textAlign: 'right',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    textAlign: 'right',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7E9D4',
    paddingVertical: 10,
  },
});

export default PlantAllergyPageArabic;
