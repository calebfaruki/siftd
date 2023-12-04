import { useEffect } from 'react';
import { StatusBar, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as apiClient from './utilities/apiClient';
import { UserProvider, useUser } from './context/user';
import SiftdTheme from './themes/SiftdTheme';
import * as Screens from './screens';

type RootStackParamList = {
  Root: undefined
}
const Stack = createNativeStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

function RootStack() {
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
      initialRouteName="Home"
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
      <Stack.Screen name="Home" component={Screens.HomeScreen} />
      <Stack.Screen name="Login" component={Screens.LoginScreen} />
      <Stack.Screen name="Profile" component={Screens.ProfileScreen} />
      <Stack.Screen name="Post" component={Screens.PostScreen} />
      <Stack.Screen name="Comments" component={Screens.CommentsScreen} />
      <Stack.Screen name="Notifications" component={Screens.NotificationsScreen} />
      <Stack.Screen name="SIFTRatings" component={Screens.SIFTRatingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer theme={SiftdTheme}>
        <StatusBar barStyle="light-content" />
        <Drawer.Navigator initialRouteName="Root" screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Root" component={RootStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}
