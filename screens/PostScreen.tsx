import { useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableHighlight } from 'react-native';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { PostScreenProps } from '../App';

// post.sub === minimum dollar value required for patron to view.
export default function PostScreen(props: PostScreenProps) {
  const post = props.route.params.post;

  const isYouTubeLink = (url: string) => {
    const pattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    return pattern.test(url);
  };

  const extractVideoId = (url: string) => {
    let videoId;
    if (url.includes('youtube.com')) {
      const match = url.match(/v=([^&]+)/);
      if (match && match[1]) {
        videoId = match[1];
      }
    } else if (url.includes('youtu.be')) {
      const match = url.match(/youtu.be\/([^?&]+)/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
    return videoId;
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Octicons name="kebab-horizontal" size={24} color="#fff" onPress={() => console.log('View Action Sheet')} />
      ),
    });
  }, [props.navigation])

  return (
    <View style={styles.container}>
      {isYouTubeLink(post.xArticle) ? (
        <>
          <YoutubePlayer videoId={extractVideoId(post.xArticle)} height={250} />
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>Published on {new Date(post.publishDate).toLocaleDateString()}</Text>
          <Text style={styles.body}>{post.blurb}</Text>
          <TouchableHighlight onPress={() => props.navigation.navigate('Comments', { postId: post._id })}>
            <View style={styles.button}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Comments</Text>
            </View>
          </TouchableHighlight>
        </>
      ) : (
        <WebView source={{ uri: post.xArticle }} style={{ flex: 1 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 225,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  body: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white'
  }
});