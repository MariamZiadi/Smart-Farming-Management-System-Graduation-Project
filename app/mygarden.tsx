import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons for a wider icon selection
import { Link, Stack } from 'expo-router';


const screenWidth = Dimensions.get('window').width; // Get the screen width

const MyGarden = ({ navigation }: any) => {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../assets/images/BG2.jpg')} 
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Ionicons
          name="arrow-back"
          size={27}
          color="white"
          style={styles.backIcon}
          onPress={() => router.push('./homepage')} 
        />

        <Text style={styles.title}>My Garden</Text>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>All</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Next Watering</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Date Added</Text></TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/apple.png')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Apple Plant</Text>
            <View style={styles.cardIconsContainer}>
              <Ionicons name="sunny" size={18} color="black" style={styles.cardIcon} />
              <Ionicons name="thermometer" size={18} color="black" style={styles.cardIcon} />
              <Ionicons name="water" size={18} color="black" style={styles.cardIcon} />
            </View>
            <Text style={styles.cardSubtitle}>Water in 7 days</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/orange.png')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Orange Plant</Text>
            <View style={styles.cardIconsContainer}>
              <Ionicons name="sunny" size={18} color="black" style={styles.cardIcon} />
              <Ionicons name="thermometer" size={18} color="black" style={styles.cardIcon} />
              <Ionicons name="water" size={18} color="black" style={styles.cardIcon} />
            </View>
            <Text style={styles.cardSubtitle}>Water in 3 days</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/grape.jpeg')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Grape Plant</Text>
            <View style={styles.cardIconsContainer}>
              <Ionicons name="sunny" size={18} color="black" style={styles.cardIcon} />
              <Ionicons name="thermometer" size={18} color="black" style={styles.cardIcon} />
              <Ionicons name="water" size={18} color="black" style={styles.cardIcon} />
            </View>
            <Text style={styles.cardSubtitle}>Water in 5 days</Text>
          </View>
        </View>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the entire screen
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  backIcon: {
    marginTop: 40,
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginRight:20,
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 30,
  },
  cardImage: {
    width: 140,
    height: 125,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  cardIconsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
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

export default MyGarden;
