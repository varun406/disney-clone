import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/constants';
import CancelIcon from '../../../assets/images/svg/cancel.svg';
import Skeleton from '../../../components/Skeleton';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const SearchCard = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.cardWrapper}>
        <>
          <Image
            source={{
              uri: 'https://www.tribute.ca/news/wp-content/uploads/2020/10/alita_battle_angel_ver31_xlg.jpg',
            }}
            style={styles.cardImage}
          />
          <Text numberOfLines={2} style={styles.cardText}>
            Alita Battle Angelesv sfdsfsdfsdf
          </Text>
        </>
        <CancelIcon width={15} height={15} stroke="#ffffff" />
      </View> */}
      <Skeleton width={270} height={windowHeight * 0.08} />
    </View>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.08,
    width: 270,
  },
  cardWrapper: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 7,
    backgroundColor: COLORS.SECONDARY_HIGHLIGHT_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  cardImage: {
    width: '40%',
    height: '100%',
    borderRadius: 5,
  },
  cardText: {
    width: '40%',
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
});
