import { Link, Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import post1 from '../assets/images/post1.jpg'; 
import post2 from '../assets/images/post2.jpg'; 
import post3 from '../assets/images/post3.png'; 
import post from '../assets/images/post.jpg'; 
import post4 from '../assets/images/sam.png'; 
import poster from '../assets/images/poster.jpg'; 
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const posts = [
  {
    id: 1,
    name: 'Emily Johnson',
    date: '3 days ago',
    text: 'Plants play an essential role in our lives, offering numerous benefits that go beyond their beauty.',
    contentImage: post, 
    photo: post3,
  },
  {
    id: 2,
    name: 'Smith',
    date: '1 day ago',
    text: 'Plants are the Earth’s lungs, let’s protect them!',
    contentImage: post2, 
    photo: post4,
  },
  {
    id: 3,
    name: 'John Doe',
    date: '2 hours ago',
    text: 'Taking care of plants is like therapy for the soul!',
    contentImage: post1,
    photo: poster,
  },
];

export default function FeedPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Feed</Text>
          <Link href="./post" style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </Link>
        </View>
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.header}>
              <Image source={post.photo} style={styles.avatar} />
              <View style={styles.headerText}>
                <Text style={styles.name}>{post.name}</Text>
                <Text style={styles.date}>{post.date}</Text>
              </View>
            </View>
            <Text style={styles.postText}>{post.text}</Text>
            <Image source={post.contentImage} style={styles.contentImage} />
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
        <View style={[styles.iconContainer, styles.shadow]}>
        <Link href="./feed">
          <Icon2 name="file-document-outline" size={30} color="#000" />
        </Link>
        </View>
        <Link href="./allFarms">
          <Icon name="local-florist" size={30} color="#000" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 140,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
    textAlign: 'left',
  },
  addButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    width: 50,
    height: 50,
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
    lineHeight: 50,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  postText: {
    fontSize: 16,
    color: '#444',
    marginVertical: 10,
  },
  contentImage: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
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
  navItem: {
    fontSize: 24,
  },
});
