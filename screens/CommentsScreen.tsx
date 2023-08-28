import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { CommentsScreenProps } from '../App';
import { Comment } from '../types';
import CommentAvatar from '../components/CommentAvatar';
import useGetComments from '../hooks/useGetComments';
import { MaterialIcons } from '@expo/vector-icons';

export default function CommentsScreen({ route, navigation }: CommentsScreenProps) {
  const postId = route.params.postId;
  const { comments, refreshing, fetchComments } = useGetComments(postId);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);

  const topLevelComments = comments.filter(comment => !comment.parent);
  const childComments = comments.filter(comment => comment.parent);

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

  const toggleCommentExpansion = (commentId: string) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(prev => prev.filter(id => id !== commentId));
    } else {
      setExpandedComments(prev => [...prev, commentId]);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="add-comment"
          size={24}
          color="#fff"
          onPress={() => console.log('New Comment')}
        />
      ),
    });
  }, [navigation]);

  const renderComment = ({ item }: { item: Comment }) => {
    const isExpanded = expandedComments.includes(item._id);
    return (
      <View style={styles.comment}>
        <View style={{ flexDirection: 'row' }}>
          <CommentAvatar author={item.author} />
          <View style={styles.commentHeading}>
            <Text style={styles.commentAuthor}>{item.author.username}</Text>
            <Text style={{ color: 'white' }}>{item.author.bigTipper && 'ELITE'}</Text>
          </View>
          <Text style={styles.commentAuthor}>+{item.ups - item.downs}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        {item.children && item.children.length > 0 && (
          <>
            <TouchableOpacity onPress={() => toggleCommentExpansion(item._id)} style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>
                {isExpanded ? 'Hide Replies' : 'Show Replies'}
              </Text>
            </TouchableOpacity>
            {isExpanded && (
              <FlatList
                data={item.children}
                renderItem={renderComment}
                keyExtractor={(comment) => comment._id.toString()}
                style={styles.childComment}
              />
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={topLevelComments}
      renderItem={renderComment}
      keyExtractor={(comment) => comment._id.toString()}
      ListEmptyComponent={<Text style={styles.loading}>No comments yet!</Text>}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchComments} />
      }
    />
  );
}

const styles = StyleSheet.create({
  comment: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
  commentHeading: {
    marginLeft: 5,
    flex: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16
  },
  commentText: {
    marginTop: 5,
    color: 'white',
  },
  childComment: {
    color: 'white',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  toggleButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#333',
    borderRadius: 5,
    alignSelf: 'center',
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 14,
  }
});
