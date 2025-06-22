import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  image?: string;
}

interface PostType {
  _id: string;
  description: string;
  image?: string;
  user: User;
}

// PostCard Component
const PostCard = ({ post }: { post: PostType }) => {
  const { description, image, user } = post;

  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        {user?.image ? (
          <Image source={{ uri: user.image }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{user?.name?.[0] ?? '?'}</Text>
          </View>
        )}
        <Text style={styles.username}>{user?.name ?? 'Unknown User'}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>

      {image && (
        <Image source={{ uri: image }} style={styles.postImage} />
      )}
    </View>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const fetchPosts = async () => {
    try {
      console.log('📦 Fetching posts...');
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('https://4f93-102-45-148-78.ngrok-free.app/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('📥 Posts fetched:', response.data);
      setPosts(response.data.reverse());
    } catch (error) {
      console.error('❌ Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchPosts();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00aaff" />
      </View>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <ImageBackground
        source={require('../assets/images/BG2.jpg')} // Update path as needed
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.loadingContainer}>
          <Text>No posts found.</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('post')}
          >
            <Text style={styles.addButtonText}>＋</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/BG2.jpg')} // Update path as needed
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <FlatList
        data={posts}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>🌱 Plant Blog</Text>
            <Text style={styles.headerSubtitle}>Learn, Share & Grow</Text>
          </View>
        }
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('post')}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgb(9, 71, 10)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 30,
    position: 'absolute',
    bottom: 7,
    right: 11,
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgb(163, 222, 164)',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgb(255, 255, 255)',
    marginTop: 4,
    marginRight:-35,
  },
  card: {
    backgroundColor: '#f9fdf9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: 'rgba(9, 71, 10, 0.1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: 'rgb(9, 71, 10)',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(9, 71, 10)',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(9, 71, 10)',
  },
  description: {
    fontSize: 14.5,
    lineHeight: 22,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(9, 71, 10, 0.15)',
  },
});

export default Feed;
