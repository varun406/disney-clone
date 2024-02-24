import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Defs, LinearGradient, Rect, Stop, Svg} from 'react-native-svg';

interface SkeletonProps {
  width: number;
  height: number;
  borderRadius?: number;
}

const Skeleton = ({width, height, borderRadius}: SkeletonProps) => {
  const transformXAnim = useSharedValue<number>(-width);

  useEffect(() => {
    transformXAnim.value = withRepeat(
      withTiming(width, {
        duration: 1000,
      }),
      -1,
      false,
    );
  }, [width]);

  const animatedTransformX = useAnimatedStyle(() => ({
    transform: [{translateX: transformXAnim.value}],
  }));

  // NOTE: STYLES FOR DYNAMIC VALUES
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      borderRadius,
      backgroundColor: '#1B2532',
      overflow: 'hidden',
    },
    swiper: {
      width: width,
      height: height,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.swiper, animatedTransformX]}>
        <Svg height="100%" width="100%">
          <Defs>
            {/* Define a linear gradient */}
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="33.33%" stopColor="#1B2532" />
              <Stop offset="66.66%" stopColor="#283647" />
              <Stop offset="100%" stopColor="#1B2532" />
            </LinearGradient>
          </Defs>
          {/* Use the linear gradient in a rectangle */}
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default Skeleton;
