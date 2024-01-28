import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const NewAndHot = () => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={{color: colors.text}}>NewAndHot</Text>
    </View>
  );
};

export default NewAndHot;

const styles = StyleSheet.create({});
