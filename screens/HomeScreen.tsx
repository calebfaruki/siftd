import { useLayoutEffect } from 'react';
import {
  StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, View, Text,
  Dimensions, Platform, FlatList, Image, RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/user';
import ensureHttps from '../utilities/ensureHttps';
import { useGetPosts } from '../hooks/useGetPosts';

const categories = [{
  name: 'Opinion',
  color: 'rgb(204, 204, 0)'
}, {
  name: 'Gameplay',
  color: 'darkviolet'
}, {
  name: 'Reviews',
  color: 'rgb(220, 20, 60)'
}, {
  name: 'Indie',
  color: 'rgb(84, 16, 23)'
}, {
  name: 'Lists',
  color: 'rgb(219, 112, 147)'
}, {
  name: 'Guides',
  color: 'rgb(145, 142, 50)'
}, {
  name: 'Previews',
  color: 'rgb(0, 0, 255)'
}, {
  name: 'Culture',
  color: 'rgb(84, 16, 23)'
}, {
  name: 'Trailers',
  color: 'rgb(255, 140, 0)'
}, {
  name: 'Features',
  color: 'rgb(0, 128, 0)'
}, {
  name: 'Interviews',
  color: 'rgb(21, 80, 110)'
}, {
  name: 'Finance',
  color: 'rgb(0, 100, 0)'
}, {
  name: 'Esports',
  color: 'rgb(21, 80, 110)'
}, {
  name: 'Industry',
  color: 'rgb(165, 42, 42)'
}, {
  name: 'Deals',
  color: 'rgb(174, 170, 68)'
}]

export default function HomeScreen(props: HomeScreenProps) {
  const isTablet = Dimensions.get('window').width >= 768
  const { posts, refreshing, fetchPosts } = useGetPosts();
  const { user } = useUser();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        user ? (
          <TouchableOpacity onPress={() => {
            props.navigation.navigate('Profile')
          }}>
            <Image
              source={{ uri: ensureHttps(user.avatar) }}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        )
      ),
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#fff"
          onPress={() => props.navigation.navigate('Notifications')}
        />
      ),
    });
  }, [props.navigation, user]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchPosts}
          />
        }
        renderItem={({ item: post }) => {
          const sourceImageUrl = (post.item.xSourceId?.savedIcon && `https://d2qvhu25iogxie.cloudfront.net/${post.item.xSourceId?.savedIcon}`) || post.item.xSourceId?.icon || 'https://siftd.net/images/favicon.ico'
          const category = categories.find((cat) => post.item.categories.find((category) => cat.name === category))
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => props.navigation.navigate('Post', { post: post.item })}
            >
              <View style={[styles.itemPreheader, { backgroundColor: category?.color }]}>
                <Text style={{
                  color: 'white', fontWeight: '900', textTransform: 'uppercase', textAlign: 'right', letterSpacing: 2
                }}>
                  {category?.name}
                </Text>
              </View>
              <Image
                style={{ height: 250 }}
                source={{ uri: `https://d2qvhu25iogxie.cloudfront.net/${(post.item.preview)}` }}
              />
              <View style={{ flexDirection: 'row', padding: 8, backgroundColor: category?.color }}>
                <Text style={styles.itemTitle}>
                  {post.item.title}
                </Text>
              </View>
              <View style={{ padding: 8, backgroundColor: '#161a1b' }}>
                <Text style={{ color: '#999' }}>
                  {post.item.blurb}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 8, backgroundColor: '#151515' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Image style={{ width: 16, height: 16 }} source={{ uri: sourceImageUrl }} />
                  <Text style={{ color: 'white', marginLeft: 8 }}>
                    {post.item.xSourceId?.name || 'SIFTD'}
                  </Text>
                </View>
                <Text style={{ flex: 1, color: 'white' }}>
                  {new Date(post.item.date).toLocaleDateString()}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="bookmark" color="#fff" size={12} style={{ marginRight: 5 }} />
                    <Text style={{ color: 'white', textAlign: 'center' }}>{post.item.bookmarks}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="arrow-up" color="#fff" size={12} style={{ marginRight: 5 }} />
                    <Text style={{ color: 'white', textAlign: 'center' }}>{post.item.oneups}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="chatbubble" color="#fff" size={12} style={{ marginRight: 5 }} />
                    <Text style={{ color: 'white', textAlign: 'center' }}>{post.item.comments}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(post) => post.item._id.toString()}
        numColumns={isTablet ? 2 : 1}
      />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171A1B',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  item: {
    flex: 1,
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  itemPreheader: {
    flexDirection: 'row',
    padding: 6,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});