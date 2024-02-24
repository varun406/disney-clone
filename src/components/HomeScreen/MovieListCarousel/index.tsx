import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {sampleDataProps} from './data';
import MovieImageCard from '../MovieImageCard';
import {COLORS} from '../../../utils/constants';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

interface MovieListCarouselProps<T> {
  Item: React.ComponentType<T>;
  title: string;
  data: sampleDataProps;
}

const MovieListCarousel = <T extends {img: string}>({
  Item,
  title,
  data,
}: MovieListCarouselProps<T>) => {
  const renderItem = ({item, index}: {item: T; index: number}) => (
    <Item key={index} {...item} />
  );
  return (
    <View>
      <Text style={styles.carouselTitle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        decelerationRate="normal"
        contentContainerStyle={styles.listContainerStyle}
        // ItemSeparatorComponent={() => <View style={{width: 3}} />}
        data={data as T[]} // Assert that data is of type T[]
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()} // Provide a key extractor
      />
    </View>
  );
};

export default MovieListCarousel;

const styles = StyleSheet.create({
  carouselTitle: {
    color: COLORS.WHITE,
    fontSize: windowHeight * 0.02,
    fontWeight: '600',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  listContainerStyle: {
    gap: 3,
    paddingHorizontal: 15,
  },
});
