import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: 'https://siftd.net/' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171A1B',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  webview: {
    flex: 1,
  },
});
