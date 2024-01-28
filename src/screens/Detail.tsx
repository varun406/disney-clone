import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const Detail = () => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={{color: colors.text}}>Detail</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
