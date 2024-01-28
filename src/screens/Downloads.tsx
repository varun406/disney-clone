import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const Downloads = () => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={{color: colors.text}}>Downloads</Text>
    </View>
  );
};

export default Downloads;

const styles = StyleSheet.create({});
