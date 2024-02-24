import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/constants';
import SearchIcon from '../assets/images/svg/search.svg';
import SearchMicIcon from '../assets/images/svg/search-mic.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchBar from '../views/SearchScreen/SearchBar';
import RecentSearch from '../views/SearchScreen/RecentSearches';
import Skeleton from '../components/Skeleton';

const Search = () => {
  const insets = useSafeAreaInsets();

  const {bottom} = insets;
  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SearchBar />
        <RecentSearch />
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingTop: 80,
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
