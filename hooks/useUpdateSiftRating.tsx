import { useState, useCallback } from 'react';
import * as apiClient from '../utilities/apiClient';

export default function useUpdateSiftRating() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const updateRating = useCallback(async (subject: string, rating: number) => {
    try {
      setLoading(true);
      const body: string = `method=user&action=updateSiftRatings&data%5Bratings%5D%5B${encodeURIComponent(subject)}%5D=${rating}`;
      const result = await apiClient.request('/user/updateSiftRatings', 'POST', body);
      console.log(result)
    } catch (err) {
      setError(err);
      console.error("Failed to update rating:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, updateRating };
}
