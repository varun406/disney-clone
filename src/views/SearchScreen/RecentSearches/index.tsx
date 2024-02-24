import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SearchCard from './SearchCard';
import {COLORS} from '../../../utils/constants';

const RecentSearch = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Searches</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </ScrollView>
    </View>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: 'column',
    gap: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.WHITE,
    paddingLeft: 10,
  },
  scrollContent: {
    gap: 10,
    paddingHorizontal: 10,
  },
});
