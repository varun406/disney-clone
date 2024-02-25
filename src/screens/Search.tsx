import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../utils/constants';
import RecentSearch from '../views/SearchScreen/RecentSearches';
import SearchBar from '../views/SearchScreen/SearchBar';
import TrendingWatch from '../views/SearchScreen/Trending';

const Search = () => {
  const insets = useSafeAreaInsets();

  const {bottom, top} = insets;
  return (
    <View style={[styles.container, {paddingTop: top, paddingBottom: bottom}]}>
      <SearchBar />
      <ScrollView
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="never">
        <RecentSearch />
        <TrendingWatch reverse />
        <TrendingWatch />
        <TrendingWatch reverse />
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingVertical: 3,
    borderRadius: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
