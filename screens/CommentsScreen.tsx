import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as apiClient from '../utilities/apiClient';
import { CommentsScreenProps } from '../stacks/HomeStack';
import { Comment } from '../types';

export default function CommentsScreen({ route }: CommentsScreenProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const postId = route.params.postId;

  useEffect(() => {
    async function fetchComments() {
      try {
        const body: string = `method=comment&action=get&data%5Bcontent%5D=${postId}`;
        const data = await apiClient.request('/comment/get', 'POST', body);
        setComments(data.comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }

    fetchComments();
  }, [postId]);

  // 1. Separate Top-Level Comments from Child Comments
  const topLevelComments = comments.filter(comment => !comment.parent);
  const childComments = comments.filter(comment => comment.parent);

  // 2. Construct a Comment Tree
  function findChildren(parentId: string): Comment[] {
    const directChildren = childComments.filter(comment => comment.parent === parentId);
    directChildren.forEach(child => {
      child.children = findChildren(child._id);
    });
    return directChildren;
  }

  topLevelComments.forEach(comment => {
    comment.children = findChildren(comment._id);
  });

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{item.author.username}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
      {item.children && item.children.length > 0 && (
        <FlatList
          data={item.children}
          renderItem={renderComment}
          keyExtractor={(comment) => comment._id.toString()}
          style={styles.childComment}
        />
      )}
    </View>
  );

  return (
    <FlatList
      data={topLevelComments}
      renderItem={renderComment}
      keyExtractor={(comment) => comment._id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 5,
  },
  childComment: {
    marginLeft: 20,
  },
});
