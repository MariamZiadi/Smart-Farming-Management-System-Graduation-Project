import { Link, Stack } from 'expo-router';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useRouter } from 'expo-router';


const screenWidth = Dimensions.get('window').width; 

const HomePage = ({ navigation }: any) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBar}>
        <Link href="./weatherNotifier" asChild>
            <TouchableOpacity>
              <Ionicons name="notifications" size={24} color="white" style={styles.notificationIcon} />
            </TouchableOpacity>
          </Link>
            <Text style={styles.topBarText}>Welcome to AgriGuard</Text>
          <Text style={styles.topdescription}>Let’s get started by adding your first plant!</Text>
          
          <Link href="./chatbot" asChild>
            <TouchableOpacity style={styles.chatbotIcon}>
            <Ionicons name="chatbubble" size={24} color="white" />
            </TouchableOpacity>
          </Link>
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
            onPress={() => router.push('/plantReminders')} 
          >
            <Ionicons name="water" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>30min Next Watering</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.garden}>
          <Text style={styles.yourgarden}>Your Farms</Text>
        <Link href ="./allFarms" style={styles.viewall}>
          View All
          </Link>
        </View>

        <View style={styles.gardencontainers}>
          <Image 
            source={require('../assets/images/cornhomeplant.jpg')} 
            style={styles.cornImage} 
          />
          <Text style={styles.cornplant}>Farm 1</Text>
          <Link href ="./mygarden" style={styles.moreinfo}>
          More Info
          </Link>
          
          {/* <View style={styles.iconsContainer}>
            <Ionicons name="water" size={20} color="black" style={styles.icon} />
            <Ionicons name="leaf" size={20} color="black" style={styles.icon} />
            <Ionicons name="sunny" size={20} color="black" style={styles.icon} />
            <Ionicons name="thermometer" size={20} color="black" style={styles.icon} />
          </View>
          <Text style={styles.cornwater}>Water in 2 Days</Text> */}
        </View>

        <View style={[styles.gardencontainers, styles.cherryContainer]}>
          <Image 
            source={require('../assets/images/cherryhomeplant.jpg')}
            style={styles.cornImage} 
          />
          <Text style={styles.cornplant}>Farm 2</Text>
          <Link href ="./mygarden" style={styles.moreinfo}>
          More Info
          </Link>          
          {/* <View style={styles.iconsContainer}>
            <Ionicons name="water" size={20} color="black" style={styles.icon} />
            <Ionicons name="leaf" size={20} color="black" style={styles.icon} />
            <Ionicons name="sunny" size={20} color="black" style={styles.icon} />
            <Ionicons name="thermometer" size={20} color="black" style={styles.icon} />
          </View>
          <Text style={styles.cornwater}>Water in 3 Days</Text> */}
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
          <Link href="./allplants" style={styles.viewallallergies}>View All</Link>
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
        <View style={styles.joinFarmSection}>
  <Text style={styles.joinFarmTitle}>Join a Farm Today</Text>
  <Text style={styles.joinFarmDescription}>
    Become part of a community of plant lovers and farmers. Connect with like-minded individuals and take part in the joys of farming.
  </Text>
      <Link href ="./groupchat" style={[styles.joinFarmButton, styles.joinFarmButtonText]}>Join Now</Link>
</View>
<View>
          <Image 
            source={require('../assets/images/diseasehome.jpg')} 
            style={styles.diseaseimg} 
          />
          <Link href="./disease_detection" style={[styles.buttonText, styles.buttondisease]}>Disease Detection</Link>
        </View>

        </ScrollView>
      <View style={styles.bottomNav}>
        <View style={[styles.iconContainer, styles.shadow]}>
        <Link href="./homepage"> 
        <Icon name="home" size={30} color="#000" />
        </Link>
        </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  chatbotIcon: {
    position: 'absolute',
    top: 14,
    right: 50,
    padding: 10,
  },
  notificationIcon: {
    position: 'absolute',
    left: 350,
    top: -100,
  },
  joinFarmContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  joinFarmCard: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  joinFarmSection: {
    marginTop: 20,  // Adjust the margin to ensure it’s positioned correctly
    padding: 20,
    backgroundColor: '#f3f3f3',  // Light background color for the section
    borderRadius: 10,
    marginBottom: 30,  // Spacing before the navigation bar
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,  // To add some horizontal padding
  },
  joinFarmTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  joinFarmDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  joinFarmButton: {
    backgroundColor: 'rgb(75, 134, 75)',  
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  joinFarmButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  joinFarmLink: {
    width: '100%',
   },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(34, 70, 34)',
    marginBottom: 10,
  },
  
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  buttonTextt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
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
    left: 5,
    width: 380, 
    height: 170, 
    resizeMode: 'cover', 
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
    width: 180, 
    alignItems: 'center', 
    justifyContent: 'center', 
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
    width: 180, 
    height: 120, 
    resizeMode: 'cover', 
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
    left: 5,
    width: 380, 
    height: 170, 
    resizeMode: 'cover', 
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
    top: 50,
    left: 145,
    fontWeight:"semibold",
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
    marginBottom: 10, 
  },
  cherryContainer: {
    marginTop: 5, 
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
    marginBottom: 15, 
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
    backgroundColor: '#fff', 
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
  addButton: 
  {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center', 
    lineHeight: 60,
    position: 'absolute',
    top: 25,
    left: 300, 
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#D7E9D4",
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
  navItem: {
    fontSize: 24,
  },
});

export default HomePage;
