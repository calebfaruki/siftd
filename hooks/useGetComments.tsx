import { useState, useEffect, useCallback } from 'react';
import { Comment } from '../types';
import * as apiClient from '../utilities/apiClient';

export default function useGetComments(postId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setRefreshing(true);
      const body: string = `method=comment&action=get&data%5Bcontent%5D=${postId}`;
      const data = await apiClient.request('/comment/get', 'POST', body);
      setComments(data.comments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setRefreshing(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, refreshing, fetchComments };
};