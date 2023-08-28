import { useState, useEffect } from 'react';
import * as apiClient from '../utilities/apiClient';

export const useGetNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setRefreshing(true);
    try {
      const data = await apiClient.request('/user/getNotifications', 'POST', 'method=user&action=getNotifications');
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    refreshing,
    fetchNotifications
  };
};
