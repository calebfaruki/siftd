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
        renderItem={({ item }) => {
          let message;
          switch (item.type) {
            case 'reply':
              message = item.count > 1 ? `There have been replies to your comment on ${item.content.title}` : `There was a reply to your comment on ${item.content.title}`
              break;
            case 'all':
              message = item.count > 1 ? `There have been ${item.count} comments on ${item.content.title}` : `There was a comment on ${item.content.title}`
              break;
            case 'mention':
              message = item.count > 1 ? `There have been ${item.count} mentions on ${item.content.title}` : `You were mentioned on ${item.content.title}`
              break;
            case 'post':
              message = item.count > 1 ? `There have been ${item.count} new posts on ${item.content.title}` : `There is a new post on ${item.content.title}`
              break;
            case 'message':
              message = item.count > 1 ? `You have new messages from ${item.user}` : `You have a new message from ${item.user}`
              break;
            default:
              message = "DONT KNOW HOW TO HANDLE CUSTOM MESSAGES YET"
              break;
          }
          return <Text style={styles.notification}>{message}</Text>
        }}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={(
          <Text style={styles.emptyState}>Notifications coming soon!</Text>
          // <Text style={styles.emptyState}>No notifications right now.</Text>
        )}
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
