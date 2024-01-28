import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const Search = () => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={{color: colors.text}}>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
