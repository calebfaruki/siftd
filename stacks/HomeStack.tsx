import * as React from 'react';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import CommentsScreen from '../screens/CommentsScreen';

export type HomeStackParamList = {
  Start: undefined;
  Post: { post: any };
  Comments: { postId: number };
};

export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Start'>;

export type PostScreenProps = NativeStackScreenProps<HomeStackParamList, 'Post'>;

export type CommentsScreenProps = NativeStackScreenProps<HomeStackParamList, 'Comments'>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={HomeScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  )
}