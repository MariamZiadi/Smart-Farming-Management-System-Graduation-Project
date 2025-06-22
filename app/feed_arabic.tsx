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
  I18nManager,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { translateText } from './utils/translation'; // Use MyMemory version

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

const FeedArabic = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (isFocused) fetchAndTranslatePosts();
  }, [isFocused]);

  async function fetchAndTranslatePosts() {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resp = await axios.get('https://4f93-102-45-148-78.ngrok-free.app/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedPosts = resp.data as PostType[];

      // Translate posts sequentially to avoid overload
      const translatedPosts: PostType[] = [];
      for (const p of fetchedPosts) {
        const isArabic = /[\u0600-\u06FF]/.test(p.description);
        const translatedDescription = isArabic
          ? p.description
          : await translateText(p.description, 'ar');
        translatedPosts.push({ ...p, description: translatedDescription });
      }

      setPosts(translatedPosts.reverse());
    } catch (err) {
      console.error('Fetch/Translation error:', err.message || err);
    } finally {
      setLoading(false);
    }
  }

  const PostCard = ({ post }: { post: PostType }) => (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        {post.user?.image ? (
          <Image source={{ uri: post.user.image }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{post.user?.name?.[0] ?? '?'}</Text>
          </View>
        )}
        <Text style={styles.username}>{post.user?.name ?? 'مستخدم مجهول'}</Text>
      </View>
      <Text style={styles.description}>{post.description}</Text>
      {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
    </View>
  );

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#00aaff" />
      <Text style={{ marginTop: 10 }}>جارٍ تحميل المنشورات...</Text>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/images/BG2.jpg')} style={{ flex: 1 }} resizeMode="cover">
      {!posts.length ? (
        <View style={styles.loadingContainer}>
          <Text>لا توجد منشورات حالياً.</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('post')}>
            <Text style={styles.addButtonText}>＋</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={posts}
            ListHeaderComponent={
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>📖 مدونة النباتات</Text>
                <Text style={styles.headerSubtitle}>شارك، تعلّم، وازرع</Text>
              </View>
            }
            renderItem={({ item }) => <PostCard post={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.container}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('post')}>
            <Text style={styles.addButtonText}>＋</Text>
          </TouchableOpacity>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 100 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  addButton: {
    position: 'absolute', bottom: 20, right: 20,
    backgroundColor: 'rgb(9, 71, 10)', width: 50, height: 50,
    borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 6
  },
  addButtonText: { color: 'white', fontSize: 28, fontWeight: 'bold', lineHeight: 30, position: 'absolute', bottom: 7, right: 11 },
  headerContainer: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 10, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'rgb(163, 222, 164)' },
  headerSubtitle: { fontSize: 14, color: 'white', marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: '#f9fdf9', borderRadius: 12, padding: 14, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, borderWidth: 1, borderColor: 'rgba(9, 71, 10, 0.1)'
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatarImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10, borderWidth: 1.5, borderColor: 'rgb(9, 71, 10)' },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgb(9, 71, 10)', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontWeight: 'bold', color: '#fff', fontSize: 18 },
  username: { fontSize: 16, fontWeight: 'bold', color: 'rgb(9, 71, 10)' },
  description: { fontSize: 14.5, lineHeight: 22, color: '#333', marginBottom: 10, textAlign: I18nManager.isRTL ? 'right' : 'left' },
  postImage: { width: '100%', height: 200, borderRadius: 10, marginTop: 8, borderWidth: 0.5, borderColor: 'rgba(9, 71, 10, 0.15)' },
});

export default FeedArabic;
