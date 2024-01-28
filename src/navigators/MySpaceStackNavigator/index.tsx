import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MySpace from '../../screens/MySpace';
import HelpAndSettings from '../../screens/MySpace';

const Stack = createNativeStackNavigator();
const MySpaceStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerTintColor: '#fff'}}>
      <Stack.Screen
        name="MySpace"
        component={MySpace}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Help" component={HelpAndSettings} />
    </Stack.Navigator>
  );
};

export default MySpaceStackNavigator;
