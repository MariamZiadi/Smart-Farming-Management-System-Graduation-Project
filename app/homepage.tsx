import { Link, Stack } from 'expo-router';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width; // Get the screen width

const HomePage = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBar}>
          <Ionicons name="notifications" size={24} color="white" style={styles.notificationIcon} />
          <Text style={styles.topBarText}>Welcome to AgriGuard</Text>
          <Text style={styles.topdescription}>Let’s get started by adding your first plant!</Text>
        </View>

        <View style={styles.boxontopbar}>
          <Text style={styles.waterreminder}>Watering Reminder</Text>
          <Text style={styles.waterreminderdesc}>Don’t forget to water your potato</Text>
          <Image 
            source={require('../assets/images/homeplant.png')}
            style={styles.plantImage} 
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('NextPage')}
          >
            <Ionicons name="water" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>30min Next Watering</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.garden}>
          <Text style={styles.yourgarden}>Your Garden</Text>
        <Link href ="./mygarden" style={styles.viewall}>
          View All
          </Link>
        </View>

        <View style={styles.gardencontainers}>
          <Image 
            source={require('../assets/images/cornhomeplant.jpg')} 
            style={styles.cornImage} 
          />
          <Text style={styles.cornplant}>Corn Plant</Text>
          <Link href ="./plant" style={styles.moreinfo}>
          More Info
          </Link>
          
          <View style={styles.iconsContainer}>
            <Ionicons name="water" size={20} color="black" style={styles.icon} />
            <Ionicons name="leaf" size={20} color="black" style={styles.icon} />
            <Ionicons name="sunny" size={20} color="black" style={styles.icon} />
            <Ionicons name="thermometer" size={20} color="black" style={styles.icon} />
          </View>
          <Text style={styles.cornwater}>Water in 2 Days</Text>
        </View>

        <View style={[styles.gardencontainers, styles.cherryContainer]}>
          <Image 
            source={require('../assets/images/cherryhomeplant.jpg')}
            style={styles.cornImage} 
          />
          <Text style={styles.cornplant}>Cherry Plant</Text>
          <Text style={styles.moreinfo}>More Info</Text>
          <View style={styles.iconsContainer}>
            <Ionicons name="water" size={20} color="black" style={styles.icon} />
            <Ionicons name="leaf" size={20} color="black" style={styles.icon} />
            <Ionicons name="sunny" size={20} color="black" style={styles.icon} />
            <Ionicons name="thermometer" size={20} color="black" style={styles.icon} />
          </View>
          <Text style={styles.cornwater}>Water in 3 Days</Text>
        </View>

        <View>
          <Image 
            source={require('../assets/images/diseasehome.jpg')} 
            style={styles.diseaseimg} 
          />
          
            <Link href ="./disease_detection" style={[styles.buttonText, styles.buttondisease]}>Disease Detection</Link>
          
        </View>

        <View>
          <Text style={styles.allergies}>Plants For Allergies</Text>
          <Link href="./allergies_plants" style={styles.viewallallergies}>View All</Link>
        </View>

        <View style={styles.allergyContainer}>
  <View style={styles.allergyRow}>
    <View style={styles.allergyItem}>
      <Image 
        source={require('../assets/images/ragweed.jpg')} 
        style={styles.allergy} 
      />
      <TouchableOpacity 
        style={styles.buttonallergy}
        onPress={() => navigation.navigate('NextPage')}
      >
        <Text style={styles.buttonText}>Ragweed</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.allergyItem}>
      <Image 
        source={require('../assets/images/poision oak.jpg')} 
        style={styles.allergy} 
      />
      <TouchableOpacity 
        style={styles.buttonallergy}
        onPress={() => navigation.navigate('NextPage')}
      >
        <Text style={styles.buttonText}>Poison Oak</Text>
      </TouchableOpacity>
    </View>
  </View>

  <View style={styles.allergyRow}>
    <View style={styles.allergyItem}>
      <Image 
        source={require('../assets/images/poison ivy.jpg')} 
        style={styles.allergy} 
      />
      <TouchableOpacity 
        style={styles.buttonallergy}
        onPress={() => navigation.navigate('NextPage')}
      >
        <Text style={styles.buttonText}>Poison Ivy</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.allergyItem}>
      <Image 
        source={require('../assets/images/nettle.jpg')} 
        style={styles.allergy} 
      />
      <TouchableOpacity 
        style={styles.buttonallergy}
        onPress={() => navigation.navigate('NextPage')}
      >
        <Text style={styles.buttonText}>Nettle Plant</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>

<View>
        <Text style={styles.allergies}>Plants Types</Text>
        <Text style={styles.viewallallergies}>View All</Text>
        </View>
        <View style={styles.allergyContainer}>
        <View style={styles.allergyRow}>
        <View style={styles.allergyItem}>
      <Image 
        source={require('../assets/images/fruit home page image.jpeg')} 
        style={styles.allergy} 
      />
      <TouchableOpacity 
        style={styles.buttontypes}
        onPress={() => navigation.navigate('NextPage')}
      >
        <Text style={styles.buttonText}>Fruits</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.allergyItem}>
      <Image 
        source={require('../assets/images/vegetatbles home img.jpg')} 
        style={styles.allergy} 
      />
      <TouchableOpacity 
        style={styles.buttontypes}
        onPress={() => navigation.navigate('NextPage')}
      >
        <Text style={styles.buttonText}>Vegetables</Text>
      </TouchableOpacity>
    </View>
  </View>

  <View style={styles.allergyRow}>
    <View style={styles.allergyItem}>
      <Image 
        source={require('../assets/images/herbs home img.jpg')} 
        style={styles.allergy} 
      />
      <TouchableOpacity 
        style={styles.buttontypes}
        onPress={() => navigation.navigate('NextPage')}
      >
        <Text style={styles.buttonText}>Herbs</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.allergyItem}>
      <Image 
        source={require('../assets/images/grains home img.jpg')} 
        style={styles.allergy} 
      />
      <TouchableOpacity 
        style={styles.buttontypes}
        onPress={() => navigation.navigate('NextPage')}
      >
        <Text style={styles.buttonText}>Grains</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>
<View>
          <Image 
            source={require('../assets/images/blog.jpg')} 
            style={styles.blogimg} 
          />
            <Link href="./feed" style={[styles.buttonText, styles.buttonblogs]}>Blogs Feed</Link>
         
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20, // Ensures there's space at the bottom when scrolling
  },

  buttonblogs:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(75, 134, 75)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 7,
    position: 'absolute',
    top: 55,
    left: 126,
  },
  blogimg:{
    position: 'relative',
    top: -5,
    left: 15,
    width: 380, // Dynamically set width to match screen
    height: 170, // Adjust height if needed
    resizeMode: 'cover', // Ensure it scales appropriately
    borderRadius:10,
  },
  buttontypes: {
    flexDirection: 'row',
    backgroundColor: 'rgb(75, 134, 75)',
    borderRadius: 10,
    paddingVertical:2,
    paddingHorizontal: 40,
    marginTop: 7,
    position: 'absolute',
    top: 82,
    left: 3,
    width: 180, // Fixed width for all buttons
    alignItems: 'center', // Align text in the center
    justifyContent: 'center', // Ensure equal space distribution
  },

  buttonallergy:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(75, 134, 75)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 7,
    position: 'absolute',
    top: 35,
    left:47,
  },
  allergy:{
    position: 'relative',
    top: -5,
    left: 0,
    width: 180, // Dynamically set width to match screen
    height: 120, // Adjust height if needed
    resizeMode: 'cover', // Ensure it scales appropriately
    borderRadius:10,
  },
  viewallallergies:{
    color: 'rgb(75, 134, 75)',
    position: 'relative',
    top: -22,
    left: 330,
  },
  allergies:{
    position: 'relative',
    top: 0,
    left: 25,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  allergyContainer: {
    padding: 10,
  },
  allergyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  allergyItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttondisease:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(75, 134, 75)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 7,
    position: 'absolute',
    top: 48,
    left: 130,
  },
  diseaseimg: {
    position: 'relative',
    top: -25,
    left: 15,
    width: 380, // Dynamically set width to match screen
    height: 170, // Adjust height if needed
    resizeMode: 'cover', // Ensure it scales appropriately
    borderRadius:10,
  },
  cornwater: {
    position: 'absolute',
    top: 90,
    left: 148,
    color: 'rgb(75, 134, 75)',
  },
  moreinfo: {
    position: 'absolute',
    top: 20,
    left: 300,
    color: 'rgb(75, 134, 75)',
  },
  cornplant: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    position: 'absolute',
    top: 20,
    left: 145,
  },
  cornImage: {
    width: 135,
    height: 125,
    marginRight: 246,
    borderRadius: 15,
  },
  gardencontainers: {
    position: 'relative',
    top: -50,
    left: 14,
    width: '93%',
    height: 125,
    backgroundColor: 'rgb(229, 229, 229)',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 10,
    borderRadius: 15,
    marginBottom: 10, // Added margin for spacing between cards
  },
  cherryContainer: {
    marginTop: 5, // Add space between the two containers
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: -67,
    marginLeft: 15,
    width: '30%',
  },
  icon: {
    marginHorizontal: 5,
  },
  garden: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15, // Spacing below
  },
  viewall: {
    color: 'rgb(75, 134, 75)',
    position: 'relative',
    top: -46,
    left: -40,
  },
  yourgarden: {
    position: 'relative',
    top: -50,
    left: 25,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  waterreminderdesc: {
    position: 'absolute',
    top: 50,
    left: 20,
    color: 'black',
    fontSize: 15,
  },
  waterreminder: {
    position: 'absolute',
    top: 15,
    left: 20,
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  boxontopbar: {
    position: 'relative',
    top: -70,
    left: 21,
    width: '90%',
    height: 130,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 10,
    borderRadius: 15,
  },
  topdescription: {
    position: 'absolute',
    top: 125,
    left: 25,
    color: 'white',
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color to cover the entire screen
  },
  topBar: {
    position: 'relative',
    width: '100%',
    height: 250,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 10,
  },
  notificationIcon: {
    position: 'absolute',
    top: 25,
    left: 370,
  },
  topBarText: {
    position: 'absolute',
    top: 75,
    left: 25,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  plantImage: {
    width: 100,
    height: 180,
    marginLeft: 240,
    marginBottom: 35,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(75, 134, 75)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 7,
    position: 'absolute',
    top: 75,
    left: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
