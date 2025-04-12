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
  TouchableOpacity,
} from 'react-native';

import post1 from '../assets/images/post1.jpg';
import post2 from '../assets/images/post2.jpg';
import post3 from '../assets/images/post3.png';
import post from '../assets/images/post.jpg';
import post4 from '../assets/images/sam.png';
import poster from '../assets/images/poster.jpg';

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
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Feed</Text>
          <TouchableOpacity>
            <Link href="./post" style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </Link>
          </TouchableOpacity>
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
        <TouchableOpacity>
          <Link href="./homepage">
            <Icon name="home" size={30} color="#000" />
          </Link>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link href="./profile">
            <Icon name="person" size={30} color="#000" />
          </Link>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link href="./disease_detection">
            <Icon2 name="leaf" size={30} color="#000" />
          </Link>
        </TouchableOpacity>

        <View style={[styles.iconContainer, styles.shadow]}>
          <TouchableOpacity>
            <Link href="./feed">
              <Icon2 name="file-document-outline" size={30} color="rgb(9, 71, 10)" />
            </Link>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Link href="./allFarms">
            <Icon name="local-florist" size={30} color="#000" />
          </Link>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 25,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
  },
  addButton: {
    backgroundColor: 'rgb(9, 71, 10)',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  postText: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: '#555',
  },
  contentImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  iconContainer: {
    backgroundColor: 'rgb(9, 71, 10)',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});
