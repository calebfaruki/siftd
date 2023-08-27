import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import * as apiClient from '../utilities/apiClient';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { User } from '../types';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export type AccountStackParamList = {
  Login: undefined;
  Profile: { user: User };
};

export type LoginScreenProps = NativeStackScreenProps<AccountStackParamList, 'Login'>;
export type ProfileScreenProps = NativeStackScreenProps<AccountStackParamList, 'Profile'>;

export default function AccountStack() {
  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Profile'>('Login');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function checkAuthentication() {
      const data = await apiClient.request('/user/autologin', 'GET', null);
      if (data.login) {
        setUser(data.user);
        setInitialRoute('Profile');
      }
    }
    checkAuthentication();
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" initialParams={{ user }} component={ProfileScreen} />
    </Stack.Navigator>
  );
}
