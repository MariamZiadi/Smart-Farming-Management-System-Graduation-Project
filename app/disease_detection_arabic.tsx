import { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  Alert,
  I18nManager,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

// Arabic to English crop mapping
const cropMap: Record<string, string> = {
  "بطاطس": "potato",
  "تفاح": "apple",
  "عنب": "grape",
  "فراولة": "strawberry",
  "خوخ": "peach"
};

// English to Arabic disease prediction map (examples)
const predictionMap: Record<string, string> = {
  "Early Blight": "اللفحة المبكرة",
  "Late Blight": "اللفحة المتأخرة",
  "Healthy": "صحي",
  "Apple Scab": "جرب التفاح",
  "Black Rot": "التعفن الأسود",
  "Cedar Apple Rust": "صدأ الأرز والتفاح",
  "Bacterial Spot": "البقعة البكتيرية",
  "Esca": "إسكا (مرض الخشب الأسود)",
  "Leaf Blight": "لفحة الأوراق",
  "Leaf Scorch": "احتراق الأوراق"
};


const PlantDiseaseDetectionArabic = () => {
  const router = useRouter();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>('');
  const [selectedCropAr, setSelectedCropAr] = useState("بطاطس");
  const cropOptionsAr = ["بطاطس", "تفاح", "عنب", "فراولة", "خوخ"];

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('الإذن مطلوب', 'يجب السماح بالوصول إلى معرض الصور!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImageUri(selectedUri);
      sendToAPI(selectedUri);
    }
  };

  const sendToAPI = async (uri: string) => {
    try {
      setIsLoading(true);
      setPrediction(null);

      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) throw new Error('الصورة غير موجودة');

      const fileUriParts = uri.split('/');
      const fileName = fileUriParts[fileUriParts.length - 1];

      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: fileName
      } as any);
      formData.append('crop', cropMap[selectedCropAr]);

      const response = await fetch(`https://850e-102-45-148-78.ngrok-free.app/predict`, {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      try {
        const result = JSON.parse(text);

        if (response.ok) {
          const arabicPrediction = predictionMap[result.prediction] || result.prediction;
          setPrediction(`${arabicPrediction}\n(${(result.probability * 100).toFixed(2)}%)`);
        } else {
          throw new Error(result.error || 'Server returned an error.');
        }
      } catch (jsonError) {
      Alert.alert('Error', 'Failed to get prediction from server.');
      }

    } catch (error) {
      Alert.alert('Error', 'Failed to get prediction from server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/BG2.jpg')}
      style={styles.background}
    >
      <Ionicons
        name="arrow-back"
        size={27}
        color="white"
        style={styles.backIcon}
        onPress={() => router.push('./homepage_arabic')}
      />
      <Text style={styles.header}>كشف أمراض</Text>
      <Text style={styles.header2}>النباتات</Text>

      <View style={styles.container}>
        <Text style={styles.dropdownLabel}>اختر نوع المحصول</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedCropAr}
            onValueChange={(itemValue) => setSelectedCropAr(itemValue)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            {cropOptionsAr.map((crop) => (
              <Picker.Item key={crop} label={crop} value={crop} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>ارفع صورة النبات</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Image
              source={require('../assets/images/imageupload.png')}
              style={styles.imagePlaceholder}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.analysisHeader}>النتيجة</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <Text style={styles.analysisText}>
            {prediction || (imageUri ? 'جارٍ التحليل...' : 'بانتظار الصورة..')}
          </Text>
        )}
      </View>

      <View style={styles.bottomNav}>
        <Link href="./homepage_arabic">
          <Icon name="home" size={30} color="#000" />
        </Link>
        <Link href="./profile_arabic">
          <Icon name="person" size={30} color="#000" />
        </Link>
        <View style={[styles.iconContainer, styles.shadow]}>
          <Link href="./disease_detection_arabic">
            <Icon2 name="leaf" size={30} color="#000" />
          </Link>
        </View>
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
  // Keep same styles from original
  background: { flex: 1 },
  backIcon: { marginTop: 30, marginLeft: 10 },
  header: {
    position: 'absolute',
    top: 50,
    left: 62,
    color: 'white',
    fontSize: 45,
    fontFamily: 'DMSerifText-Regular',
  },
  header2: {
    position: 'absolute',
    top: 105,
    left: 106,
    color: 'white',
    fontSize: 45,
    fontFamily: 'DMSerifText-Regular',
  },
  container: {
    position: 'absolute',
    top: 195,
    left: 0,
    right: 0,
    bottom: 50,
    backgroundColor: 'white',
  },
  dropdownLabel: {
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 22,
    top: 15,
    color: 'rgb(2, 91, 4)',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 10,
    overflow: 'hidden',
    top: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  uploadButton: {
    left: 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
    width: 270,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(2, 91, 4)',
  },
  imageContainer: {
    height: 200,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginLeft: 20,
    marginBottom: 18,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  analysisHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    left: 140,
    color: 'rgb(2, 91, 4)',
  },
  analysisText: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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

export default PlantDiseaseDetectionArabic;
