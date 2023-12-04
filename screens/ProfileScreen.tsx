import * as React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, ImageBackground, SectionList, TouchableOpacity } from 'react-native';
import { useUser } from '../context/user';
import ensureHttps from '../utilities/ensureHttps';
import cookieManager from '../utilities/cookieManager';

const profileLinks = [{
  data: [
    'Notifications',
    'Messages',
    'SIFT Ratings',
    'Eval Ratings',
    'Achievements',
    'Bookmarks',
    'Logout'
  ]
}]

export default function ProfileScreen(props: ProfileScreenProps) {
  const { user, setUser } = useUser();

  const handleNavigation = async (item: string) => {
    switch (item) {
      case 'Notifications':
        props.navigation.navigate('Notifications')
        break;
      case 'Messages':
        // props.navigation.navigate('Messages')
        break;
      case 'SIFT Ratings':
        props.navigation.navigate('SIFTRatings')
        break;
      case 'Eval Ratings':
        // props.navigation.navigate('EvalRatings')
        break;
      case 'Achievements':
        // props.navigation.navigate('Achievements')
        break;
      case 'Bookmarks':
        // props.navigation.navigate('Bookmarks')
        break;
      case 'Logout':
        await cookieManager.remove()
        setUser(undefined)
        props.navigation.navigate('Home')
        break;
      default:
        break;
    }
  }

  if (!user) {
    props.navigation.navigate('Login')
  } else {
    return (
      <>
        <ImageBackground
          source={{ uri: `https://d2qvhu25iogxie.cloudfront.net/${user.bannerUrl}` }}
          style={styles.backgroundImage}
        >
          <View style={styles.centeredContent}>
            <Image
              style={styles.avatar}
              source={{ uri: ensureHttps(user.avatar) }}
            />
            <Text style={styles.username}>{user.username}</Text>
          </View>
        </ImageBackground>
        <ScrollView style={styles.container}>
          <SectionList
            sections={profileLinks}
            scrollEnabled={false}
            style={{ width: '100%' }}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItem} onPress={() => handleNavigation(item)}>
                <Text style={styles.listItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100,
    marginHorizontal: 'auto',
  },
  username: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  listItemText: {
    fontSize: 16,
    color: 'white',
  },
});
