import { useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Linking } from 'react-native';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { PostScreenProps } from '../App';
import Button from '../components/Button';
import { useUser } from '../context/user';

// post.sub === minimum dollar value required for patron to view.
export default function PostScreen(props: PostScreenProps) {
  const post = props.route.params.post;
  const deviceWidth = Dimensions.get('window').width;
  const videoHeight = deviceWidth * (9 / 16);
  const { user } = useUser();

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

  const hasAccess = () => {
    if (post.sub === 0) {
      return true;
    }
    if (new Date(post.publishDate).getTime() < new Date().getTime() - 7 * 24 * 60 * 60 * 1000) {
      return true;
    }
    return (user?.subStatus?.access || 0) >= post.sub;
  };

  if (!hasAccess()) {
    return (
      <View style={styles.container}>
        <Text style={styles.paywallText}>
          This content is for Patrons or trial users only!
        </Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
          <Button style={{ backgroundColor: 'white' }} onPress={() => Linking.openURL('https://siftd.net')}>
            <Text style={{ color: 'black', fontSize: 18 }}>Register on our website</Text>
          </Button>
          <View style={{ marginHorizontal: 5 }} />
          <Button onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ color: 'white', fontSize: 18 }}>Log In</Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isYouTubeLink(post.xArticle) ? (
        <>
          <YoutubePlayer videoId={extractVideoId(post.xArticle)} width={deviceWidth} height={videoHeight} />
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>Published on {new Date(post.publishDate).toLocaleDateString()}</Text>
          <Text style={styles.body}>{post.blurb}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button style={{ flexGrow: 1, marginTop: 10 }} onPress={() => props.navigation.navigate('Comments', { postId: post._id })}>
              <Ionicons name="chatbubble-ellipses-outline" color="#fff" size={18} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontSize: 14 }}>Comments</Text>
            </Button>
            <Button style={{ flexGrow: 1, marginTop: 10 }} onPress={() => console.log('Upvote')}>
              <Ionicons name="arrow-up" color="#fff" size={18} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontSize: 14 }}>Upvote</Text>
            </Button>
            <Button style={{ flexGrow: 1, marginTop: 10 }} onPress={() => console.log('Upvote')}>
              <Ionicons name="bookmark-outline" color="#fff" size={18} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontSize: 14 }}>Bookmark</Text>
            </Button>
          </View>
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
  paywallText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
});