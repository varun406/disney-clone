import React, {useContext, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {data} from '..';
import PlayIcon from '../../../assets/images/svg/play.svg';
import PlusIcon from '../../../assets/images/svg/plus.svg';
import {COLORS} from '../../../utils/constants';
import Card from './Card';
import Pagination from './Pagination';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const MainBanner = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth}
        decelerationRate="fast"
        scrollEventThrottle={16}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        data={data}
        renderItem={({item, index}) => {
          return (
            <Card key={index} index={index} item={item} scrollX={scrollX} />
          );
        }}
      />

      <View style={styles.ctaWrapper}>
        <TouchableOpacity activeOpacity={0.7} style={styles.watchNowCTA}>
          <PlayIcon width={15} height={15} />
          <Text style={styles.watchNowText}>Watch Now</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.addToWatchListCTA}>
          <PlusIcon width={25} height={25} fill="#fff" />
        </TouchableOpacity>
      </View>
      <Pagination data={data} x={scrollX} />
    </View>
  );
};

export default MainBanner;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  ctaWrapper: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  watchNowCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#242424',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  watchNowText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  addToWatchListCTA: {
    backgroundColor: '#242424',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
});
