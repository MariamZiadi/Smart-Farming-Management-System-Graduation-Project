import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
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
          <Text style={styles.avatar}>{user.name[0]}</Text>
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{user?.name?.[0] ?? '?'}</Text>
          </View>
        )}
        <Text style={styles.username}>{user?.name ?? 'Unknown User'}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>

      {image && <Text style={styles.imageLink}>🖼 Image uploaded</Text>}
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
      const response = await axios.get('https://f2b6-41-199-4-67.ngrok-free.app/posts', {
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
      <View style={styles.loadingContainer}>
        <Text>No posts found.</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('post')}
        >
          <Text style={styles.addButtonText}>+ Add Post</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('post')}
      >
        <Text style={styles.addButtonText}>+ Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 80,
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
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  avatar: {
    backgroundColor: '#444',
    color: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
  },
  imageLink: {
    color: '#007aff',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default Feed;
