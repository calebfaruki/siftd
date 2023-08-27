import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AccountStack from './stacks/AccountStack';
import HomeStack from './stacks/HomeStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'newspaper';

          if (route.name === 'Home') {
            iconName = focused ? 'newspaper' : 'newspaper';
            return <FontAwesome5 name="newspaper" size={size} color={color} />
          } else if (route.name === 'Profile') {
            return <Ionicons name="person-circle-outline" size={size} color={color} />
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray'
      })}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Account" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
