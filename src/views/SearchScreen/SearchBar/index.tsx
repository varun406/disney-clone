import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import SearchMicIcon from '../../../assets/images/svg/search-mic.svg';
import SearchIcon from '../../../assets/images/svg/search.svg';
import {COLORS} from '../../../utils/constants';

const SearchBar = () => (
  <View style={styles.searchBar}>
    <View style={styles.searchSection}>
      <SearchIcon width={22} height={22} />
      <TextInput
        cursorColor={COLORS.SECONDARY_HIGHLIGHT_COLOR}
        placeholder="Movies, shows and more"
        style={styles.searchInput}
      />
    </View>
    <SearchMicIcon width={25} height={25} />
  </View>
);

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  searchInput: {
    width: '80%',
  },
});
