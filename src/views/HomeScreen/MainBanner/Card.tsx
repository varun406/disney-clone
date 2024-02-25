import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../utils/constants';

type BannerCardProps = {
  item: {
    background: string;
    logo: string;
  };
  index: number;
  scrollX: Animated.Value;
};

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Card = ({item, index, scrollX}: BannerCardProps) => {
  // TAKING INPUT RANGE FROM PREV MIDDLE AND NEXT
  const inputRange = [
    (index - 1) * windowWidth,
    index * windowWidth - 50,
    index * windowWidth,
    index * windowWidth + 50,
    (index + 1) * windowWidth,
  ];

  const backgroundOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.05, 0.5, 1, 0.5, 0.05],
    extrapolate: 'clamp',
  });

  const logoOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 0, 1, 0, 0],
  });

  const transformXAnim = scrollX.interpolate({
    inputRange,
    outputRange: [
      windowWidth,
      windowWidth / 3,
      0,
      -windowWidth / 3,
      -windowWidth,
    ],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.bannerImage, {opacity: backgroundOpacity}]}
        source={{
          uri: item.background,
        }}
      />
      {/* NOTE: GRADIENT OVERLAY */}
      <View style={styles.gradientOverlay}>
        <LinearGradient
          style={styles.gradient}
          start={{x: 0.5, y: 0.0}}
          end={{x: 0.5, y: 1.0}}
          colors={[
            'rgba(11, 15, 21,1)',
            'transparent',
            'transparent',
            'rgba(11, 15, 21,0.95)',
            'rgba(11, 15, 21,1)',
          ]}
          locations={[0.0, 0.1, 0.3, 0.5, 0.6]}></LinearGradient>
      </View>
      <View style={styles.bannerSummary}>
        <Animated.Image
          style={[
            styles.bannerLogo,
            {opacity: logoOpacity, transform: [{translateX: transformXAnim}]},
          ]}
          source={{
            uri: item.logo,
          }}
        />
        {/* <Text style={styles.bannerSummaryText}>New Release</Text> */}
        <Animated.Text
          style={[styles.bannerSummaryText, {opacity: logoOpacity}]}>
          2024 • 7 languages • Romance • Comedy • Drama
        </Animated.Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.52,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    width: windowWidth,
    height: windowHeight * 0.7,
  },
  gradient: {
    flex: 1,
    height: windowHeight * 0.7,
  },
  bannerImage: {
    width: windowWidth,
    height: windowHeight * 0.52,
  },
  bannerSummary: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  bannerSummaryText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerLogo: {
    width: windowWidth * 0.6,
    height: 100,
    objectFit: 'contain',
  },
});
