import * as React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Text, Dimensions, Platform, FlatList, Image } from 'react-native';
import { ItemWrap } from '../types';
import * as apiClient from '../utilities/apiClient';
import { HomeScreenProps } from '../stacks/HomeStack';

export default function HomeScreen(props: HomeScreenProps) {
  const isTablet = Dimensions.get('window').width >= 768
  const [posts, setPosts] = React.useState<ItemWrap[]>([])
  React.useEffect(() => {
    async function fetchPosts() {
      const data = await apiClient.request('/content/getSift', 'POST', null)
      setPosts(data.items)
    }
    fetchPosts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item: post }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => props.navigation.navigate('Post', { post: post.item })}
            >
              <Image
                style={styles.itemPreview}
                source={{ uri: `https://d2qvhu25iogxie.cloudfront.net/${(post.item.preview)}` }}
              />
              <Text style={styles.itemFooter}>
                {post.item.title}
              </Text>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(post) => post.item._id.toString()}
        numColumns={isTablet ? 2 : 1}
      />
    </SafeAreaView>
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
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  itemPreview: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemFooter: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});