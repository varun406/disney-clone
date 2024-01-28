import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import BottomNavigator from '../BottomNavigator';
import WhoWatching from '../../screens/WhoWatching';
import CreateProfile from '../../screens/CreateProfile';
import {COLORS} from '../../utils/constants';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WhoWatching" component={WhoWatching} />
      <Stack.Screen name="Tab" component={BottomNavigator} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen
        name="MySpace"
        component={CreateProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
