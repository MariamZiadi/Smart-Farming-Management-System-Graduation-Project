
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
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

const PlantDiseaseDetection = () => {
  const router = useRouter();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>('');
  const [selectedCrop, setSelectedCrop] = useState("potato");
  const cropOptions = ["potato", "apple", "grape", "strawberry", "peach"];

  
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
      console.log("Image URI:", selectedUri);

      setImageUri(selectedUri);
      sendToAPI(selectedUri); // Send image to Flask
    }
  };

  const sendToAPI = async (uri: string) => {
    try {
      setIsLoading(true);
      setPrediction(null);
  
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) throw new Error('Image file does not exist');
  
      const fileUriParts = uri.split('/');
      const fileName = fileUriParts[fileUriParts.length - 1];
  
      const imageBlob = await fetch(uri).then(res => res.blob());
  
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: fileName
      } as any);
      formData.append('crop', selectedCrop);
  
      const response = await fetch('https://nice-barnacle-complete.ngrok-free.app/predict', {
        method: 'POST',
        body: formData,
      });
  
      const text = await response.text();
      console.log("📦 Raw response from server:", text);
  
      try {
        const result = JSON.parse(text);
  
        if (response.ok) {
          setPrediction(`${result.prediction} (${(result.probability * 100).toFixed(2)}%)`);
        } else {
          console.error("❌ API error response:", result);
          throw new Error(result.error || 'Server returned an error.');
        }
  
      } catch (jsonError) {
        console.error("🚨 JSON Parse Error:", jsonError);
        console.log("📃 Full response that failed parsing:", text);
        Alert.alert("Error", "Invalid response from server. See console for details.");
      }
  
    } catch (error) {
      Alert.alert('Error', 'Failed to get prediction from server.');
      console.error("🚫 Outer error in sendToAPI:", error);
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
          <Text style={styles.analysisText}>
            {prediction || (imageUri ? 'Analyzing...' : 'Waiting for Image..')}
          </Text>
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
    margin: 20,
    marginBottom: 7,
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
    top:20,
    color: 'rgb(2, 91, 4)',
    fontWeight: 'bold',
  },
  
  dropdownContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    overflow: 'hidden',
    top:20,
  },
  
  picker: {
    height: 50,
    width: '100%',
    //color: 'rgb(2, 91, 4)',
  },
  imageContainer: {
    height: 200,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 20,
    marginTop: 5,
    marginBottom: 22,
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
    left: 110,
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
