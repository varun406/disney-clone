import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import BottomNavigator from '../BottomNavigator';
import WhoWatching from '../../screens/WhoWatching';
import CreateProfile from '../../screens/CreateProfile';
import {COLORS} from '../../utils/constants';
import Detail from '../../screens/Detail';

export type RootStackParamList = {
  Tab: undefined;
  WhoWatching: undefined;
  CreateProfile: undefined;
  Detail: undefined;
};

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.WHITE, // Set your desired color here
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: COLORS.WHITE,
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: COLORS.BACKGROUND,
        },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="WhoWatching" component={WhoWatching} />
      <Stack.Screen
        name="Tab"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
