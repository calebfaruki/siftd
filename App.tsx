import { useEffect } from 'react';
import { StatusBar, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Item } from './types';
import * as apiClient from './utilities/apiClient';
import { UserProvider, useUser } from './context/user';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';
import CommentsScreen from './screens/CommentsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SiftdTheme from './themes/SiftdTheme';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Drawer = createDrawerNavigator();

export type HomeStackParamList = {
  Start: undefined;
  Login: undefined;
  Profile: undefined;
  Post: { post: Item };
  Comments: { postId: number };
  Notifications: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Start'>;
export type LoginScreenProps = NativeStackScreenProps<HomeStackParamList, 'Login'>;
export type ProfileScreenProps = NativeStackScreenProps<HomeStackParamList, 'Profile'>;
export type PostScreenProps = NativeStackScreenProps<HomeStackParamList, 'Post'>;
export type CommentsScreenProps = NativeStackScreenProps<HomeStackParamList, 'Comments'>;
export type NotificationsScreenProps = NativeStackScreenProps<HomeStackParamList, 'Notifications'>;

function HomeStack() {
  const navigation = useNavigation();
  const { setUser } = useUser();

  useEffect(() => {
    async function checkAuthentication() {
      const data = await apiClient.request('/user/autologin', 'GET', null);
      if (data.login) {
        setUser(data.user);
      }
    }
    checkAuthentication();
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={() => ({
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitle: () => (
          <Image
            source={require('./assets/icon-transparent.png')}
            style={{ width: 40, height: 40, resizeMode: 'contain' }}
          />
        ),
      })}
    >
      <Stack.Screen name="Start" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer theme={SiftdTheme}>
        <StatusBar barStyle="light-content" />
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Home" component={HomeStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
