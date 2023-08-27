import React from 'react';
import { View, Text, StyleSheet, Image, Linking, Button } from 'react-native';
import { PostScreenProps } from '../stacks/HomeStack';

export default function PostScreen(props: PostScreenProps) {
  const post = props.route.params.post;

  console.log('PostScreen', Object.keys(post))
  const renderArticle = () => {
    return (
      <>
        <Text style={styles.title}>{post.title}</Text>
        {/* Replace the following line with a WebView component to render the sArticle content */}
        <Text style={styles.body}>{post.sArticle}</Text>
      </>
    );
  };

  const renderVideo = () => {
    return (
      <>
        <Text style={styles.title}>{post.title}</Text>
        {/* Replace the following line with a video player component to play the sVideo content */}
        <Text style={styles.body}>Video Content Here</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `https://d2qvhu25iogxie.cloudfront.net/${post.preview}` }}
      />
      {post.sArticle && renderArticle()}
      {post.sVideo && renderVideo()}
      {post.xArticle && (
        <Button title="External Article Link" onPress={() => Linking.openURL(post.xArticle)} />
      )}
      {post.xVideo && (
        <Button title="External Video Link" onPress={() => Linking.openURL(post.xVideo)} />
      )}
      <Button
        title={`View 42 Comments`}
        onPress={() => props.navigation.navigate('Comments', { postId: post._id })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 225,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  body: {
    fontSize: 14,
    marginBottom: 5
  }
});