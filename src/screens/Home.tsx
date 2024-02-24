import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MainBanner from '../views/HomeScreen/MainBanner/MainBanner';
import {COLORS} from '../utils/constants';
import MovieImageCard from '../components/HomeScreen/MovieImageCard';
import MovieListCarousel from '../components/HomeScreen/MovieListCarousel';
import {
  data,
  kidsCorner,
  latestReleases,
} from '../components/HomeScreen/MovieListCarousel/data';

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar
          backgroundColor="transparent"
          animated={true}
          translucent={true}
        />
        <MainBanner />
        <View style={styles.movieListSections}>
          <MovieListCarousel
            data={data}
            title="Continue Watching for Varun"
            Item={MovieImageCard}
          />
          <MovieListCarousel
            data={latestReleases}
            title="Latest Releases"
            Item={MovieImageCard}
          />
          <MovieListCarousel
            data={kidsCorner}
            title="Kids' Corner"
            Item={MovieImageCard}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  movieListSections: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 15,
  },
});
