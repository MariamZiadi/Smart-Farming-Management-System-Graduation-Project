import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './homepage';

const screenWidth = Dimensions.get('window').width; // Get the screen width

const MyGarden = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Image 
            source={require('../assets/images/post2 - Copy.jpg')} 
            style={styles.plantimg} 
          />
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={styles.backIcon}
            onPress={() => navigation.goBack(HomePage)}
          />
        </View>

        <View style={styles.topBar}>
          <Text style={styles.plantName}>Corn Plant</Text>
          <Text style={styles.plantTag}>Indoor Plant</Text>

          <View style={styles.infoBoxContainer}>
            <View style={styles.infoBox}>
              <Ionicons name="sunny" size={20} color="black" />
              <Text style={styles.infoText}>Sunlight</Text>
              <Text style={styles.infoDetail}>Medium</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="water" size={20} color="black" />
              <Text style={styles.infoText}>Watering</Text>
              <Text style={styles.infoDetail}>0.25lt/week</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="thermometer" size={20} color="black" />
              <Text style={styles.infoText}>Temperature</Text>
              <Text style={styles.infoDetail}>15-20C</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="leaf" size={20} color="black" />
              <Text style={styles.infoText}>Fertilizer</Text>
              <Text style={styles.infoDetail}>Organic</Text>
            </View>
          </View>

          <Text style={styles.informationHeader}>Information</Text>
          <Text style={styles.informationText}>
            Corn is an annual C4 grass plant. It has large, elongated, narrow leaves that grow alternately in opposite sites around the stems.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  plantimg: {
    width: screenWidth,
    height: 400,
    resizeMode: 'cover',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  topBar: {
    marginTop: -50,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginBottom: 20, // Add space between containers
  },
  plantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  plantTag: {
    backgroundColor: 'rgb(200, 255, 200)',
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    fontSize: 14,
    color: 'black',
    position:'relative',
    top:-45,
    left:280,
  },
  infoBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
    position:'relative',
    top:-45,
  },
  infoBox: {
    width: '48%',
    backgroundColor: 'rgb(240, 240, 240)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10, // Add space between info boxes
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    marginTop: 5,
  },
  infoDetail: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  informationHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    position:'relative',
    top:-55,
  },
  informationText: {
    fontSize: 14,
    color: 'gray',
    lineHeight: 20,
    position:'relative',
    top:-55,
  },
});

export default MyGarden;
