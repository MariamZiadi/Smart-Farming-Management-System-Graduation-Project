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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
const API_URL = "http://10.0.2.2:5000";

const PlantDiseaseDetection = () => {
  const router = useRouter();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>('');
  const [treatment, setTreatment] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState("potato");
  const cropOptions = ["potato", "apple", "grape", "strawberry", "peach"];

  const getTreatment = (crop: string, disease: string): string => {
    const treatments: Record<string, Record<string, string>> = {
      potato: {
        'late blight': 'Use fungicides containing mancozeb or chlorothalonil. Ensure proper spacing and avoid overhead irrigation.',
        'early blight': 'Apply fungicides like azoxystrobin or copper-based sprays. Rotate crops and remove infected debris.',
        healthy: 'No treatments needed.',
      },
      apple: {
        'cedar apple rust': 'Apply fungicides such as myclobutanil during early leaf development. Remove nearby junipers.',
        'black rot': 'Prune affected branches and apply captan or thiophanate-methyl. Sanitize pruning tools.',
        'scab': 'Use scab-resistant varieties or apply fungicides like captan or mancozeb.',
        healthy: 'No treatments needed.',
      },
      grape: {
        'black rot': 'Remove infected mummies and apply fungicides like myclobutanil or mancozeb.',
        'esca': 'No chemical cure. Remove and destroy infected vines. Practice good vineyard sanitation.',
        'leaf blight': 'Use copper-based fungicides and ensure good air circulation through pruning.',
        healthy: 'No treatments needed.',
      },
      peach: {
        'bacterial spot': 'Apply copper-based sprays early in the season. Use resistant varieties and avoid overhead watering.',
        healthy: 'No treatments needed.',
      },
      strawberry: {
        'leaf scorch': 'Use certified disease-free plants. Apply fungicides like myclobutanil if needed.',
        healthy: 'No treatments needed.',
      },
    };

    const normalizedDisease = disease.split('\n')[0].trim().toLowerCase();
    return treatments[crop]?.[normalizedDisease] || 'No treatment recommendation available.';
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Permission to access media library is required!');
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
      setTreatment(null);

      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) throw new Error('Image file does not exist');

      const fileUriParts = uri.split('/');
      const fileName = fileUriParts[fileUriParts.length - 1];

      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: fileName
      } as any);
      formData.append('crop', selectedCrop);

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const text = await response.text();
      try {
        const result = JSON.parse(text);

        if (response.ok) {
          const formattedPrediction = `${result.prediction}\n(${(result.probability * 100).toFixed(2)}%)`;
          setPrediction(formattedPrediction);
          const treatmentText = getTreatment(selectedCrop, result.prediction);
          setTreatment(treatmentText);
        } else {
          throw new Error(result.error || 'Server returned an error.');
        }
      } catch (jsonError) {
        Alert.alert("Error", "Invalid response from server. See console for details.");
        console.error("JSON parse error:", jsonError);
        console.log("Raw text:", text);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get prediction from server.');
      console.error("sendToAPI error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={styles.background}>
      <Ionicons
        name="arrow-back"
        size={27}
        color="white"
        style={styles.backIcon}
        onPress={() => router.push('./homepage')}
      />
      <Text style={styles.header}>Plant Disease </Text>
      <Text style={styles.header2}>Detection </Text>

      <View style={styles.container}>
        <Text style={styles.dropdownLabel}>Please choose the crop</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedCrop}
            onValueChange={(itemValue) => setSelectedCrop(itemValue)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            {cropOptions.map((crop) => (
              <Picker.Item key={crop} label={crop} value={crop} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>Upload Your Plant Image</Text>
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

        <Text style={styles.analysisHeader}>Analysis</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <Text style={styles.analysisText}>
              {prediction || (imageUri ? 'Analyzing...' : 'Waiting for Image..')}
            </Text>
            {treatment && (
              <Text style={styles.treatmentText}>
                Recommended Treatment: {treatment}
              </Text>
            )}
          </>
        )}
      </View>

      <View style={styles.bottomNav}>
        <Link href="./homepage">
          <Icon name="home" size={30} color="#000" />
        </Link>
        <Link href="./profile">
          <Icon name="person" size={30} color="#000" />
        </Link>
        <View style={[styles.iconContainer, styles.shadow]}>
          <Link href="./disease_detection">
            <Icon2 name="leaf" size={30} color="#000" />
          </Link>
        </View>
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
  backIcon: {
    marginTop: 30,
    marginLeft: 10,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 62,
    color: 'white',
    fontSize: 45,
    fontFamily: 'DMSerifText-Regular',
    fontWeight: 'semibold',
  },
  header2: {
    position: 'absolute',
    top: 105,
    left: 106,
    color: 'white',
    fontSize: 45,
    fontFamily: 'DMSerifText-Regular',
    fontWeight: 'semibold',
  },
  container: {
    position: 'absolute',
    top: 195,
    left: 0,
    right: 0,
    bottom: 50,
    backgroundColor: 'white',
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
  treatmentText: {
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 20,
    color: '#444',
    fontStyle: 'italic',
    lineHeight: 24,
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
  navIcon: {
    fontSize: 30,
  },
});

export default PlantDiseaseDetection;