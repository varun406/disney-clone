import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';

interface TrendingWatchProps {
  reverse?: boolean;
}

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const ALTEREDHEIGHT =
  windowWidth >= 768 ? windowHeight * 0.7 : windowHeight * 0.5;

const COMMON_GAP = 5;

const TrendingWatch = ({reverse}: TrendingWatchProps) => {
  return (
    <View
      style={[
        styles.gridContainer,
        {flexDirection: reverse ? 'row-reverse' : 'row'},
      ]}>
      <View style={styles.leftSide}>
        <Animated.View
          style={styles.bannerImageWrap}
          entering={FadeInUp.duration(500).delay(500)}
          key={'sdfdsf'}>
          <Image
            style={styles.bannerImage}
            source={{
              uri: 'https://th.bing.com/th/id/R.d1fd91ca79107fd858ed34e9ff7b9017?rik=SDKSKqhSd8U8AQ&riu=http%3a%2f%2fis2.mzstatic.com%2fimage%2fthumb%2fVideo5%2fv4%2f62%2f9b%2f8b%2f629b8bee-33d4-1945-443e-d76720c8fc62%2fsource%2f2000x3000sr.jpg&ehk=e21VpTdQxz7pWKacpujnlwwi1de9t%2bIFNQGMaQCX%2fOA%3d&risl=&pid=ImgRaw&r=0',
            }}
          />
        </Animated.View>
        <View style={styles.sideImageWrap}>
          <View style={styles.sideImage}>
            <Image
              style={styles.sideImage}
              source={{
                uri: 'https://image.tmdb.org/t/p/original/2oei26rOW8jYNcvQ17lAip78S6H.jpg',
              }}
            />
          </View>
          <View style={styles.sideImage}>
            <Image
              style={styles.sideImage}
              source={{
                uri: 'https://th.bing.com/th/id/OIP.wCRy8aPTPT3r6709F2e_ogHaKX?rs=1&pid=ImgDetMain',
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.rightSide}>
        <View style={styles.sideImage}>
          <Image
            style={styles.sideImage}
            source={{
              uri: 'https://th.bing.com/th/id/OIP.7LrbYKTfo_WnwKQdkiX3rgHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            }}
          />
        </View>
        <View style={styles.sideImage}>
          <Image
            style={styles.sideImage}
            source={{
              uri: 'https://www.themoviedb.org/t/p/original/nOrBmtk9CSS39AXvO2L4Tm20EAd.jpg',
            }}
          />
        </View>
        <View style={styles.sideImage}>
          <Image
            style={styles.sideImage}
            source={{
              uri: 'https://www.tribute.ca/news/wp-content/uploads/2020/10/alita_battle_angel_ver31_xlg.jpg',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TrendingWatch;

const styles = StyleSheet.create({
  gridContainer: {
    height: windowWidth >= 768 ? windowHeight * 0.8 : windowHeight * 0.6,
    overflow: 'hidden',
    gap: COMMON_GAP,
    marginBottom: COMMON_GAP,
    paddingHorizontal: 10,
  },
  leftSide: {
    flex: windowWidth >= 768 ? 3 : 2.7,
    flexDirection: 'column',
    gap: COMMON_GAP,
  },
  rightSide: {
    flex: windowWidth >= 768 ? 1 : 1.3,
    flexDirection: 'column',
    gap: COMMON_GAP,
  },
  bannerImageWrap: {
    height: windowWidth >= 768 ? ALTEREDHEIGHT * 0.75 : ALTEREDHEIGHT * 0.8,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    // aspectRatio: 5 / 6,
    objectFit: 'fill',
  },
  sideImageWrap: {
    height: ALTEREDHEIGHT * 0.4,
    flexDirection: 'row',
    gap: COMMON_GAP,
  },
  sideImage: {
    flex: 1,
    borderRadius: 3,
    objectFit: 'fill',
  },
});
