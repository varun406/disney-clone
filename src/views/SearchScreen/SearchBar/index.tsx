import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import SearchMicIcon from '../../../assets/images/svg/search-mic.svg';
import SearchWhiteIcon from '../../../assets/images/svg/search-white.svg';
import SearchBlackIcon from '../../../assets/images/svg/search.svg';
import {COLORS} from '../../../utils/constants';

const SearchBar = () => {
  const [isFocus, setFocus] = useState(false);

  return (
    <View
      style={[
        styles.searchBar,
        isFocus ? styles.focusedSearchBar : styles.notFocusedSearchBar,
      ]}>
      <View style={styles.searchSection}>
        {isFocus ? (
          <SearchWhiteIcon width={22} height={22} />
        ) : (
          <SearchBlackIcon width={22} height={22} />
        )}
        <TextInput
          cursorColor={
            isFocus ? COLORS.WHITE : COLORS.SECONDARY_HIGHLIGHT_COLOR
          }
          placeholderTextColor={
            isFocus ? COLORS.WHITE : COLORS.SECONDARY_HIGHLIGHT_COLOR
          }
          placeholder="Movies, shows and more"
          style={styles.searchInput}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
      </View>
      <SearchMicIcon
        width={25}
        height={25}
        fill={isFocus ? COLORS.WHITE : undefined}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 15,
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
  focusedSearchBar: {
    backgroundColor: COLORS.SECONDARY_HIGHLIGHT_COLOR,
  },
  notFocusedSearchBar: {
    backgroundColor: COLORS.WHITE,
  },
});
