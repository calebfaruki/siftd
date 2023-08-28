import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useGetNotifications } from '../hooks/useGetNotifications';

export default function NotificationsScreen() {
  const { notifications, refreshing, fetchNotifications } = useGetNotifications();

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchNotifications}
          />
        }
        renderItem={({ item }) => <Text style={styles.notification}>{item.message}</Text>}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyState}>No notifications right now.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
  emptyState: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
  notification: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
    color: 'white',
  },
});
