import { Link, Stack } from 'expo-router';
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
      <ScrollView>
        <Text style={styles.title}>Feed</Text>
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.header}>
              <Image
                source={post.photo}
                style={styles.avatar}
              />
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
      <Link href="/post" style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginTop: 25,
    fontSize: 45,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
    marginBottom: 25,
    textAlign: 'center',
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
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'rgb(9, 71, 10)',
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
    textAlign: 'center', // Ensure text is centered
    lineHeight: 60, // Matches the button height for vertical centering
  },
});
