import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/constants';

type DotsProps = {
  index: number;
  x: Animated.Value;
};

const {width: windowWidth} = Dimensions.get('window');

const Dots = ({index, x}: DotsProps) => {
  const inputRange = [
    (index - 1) * windowWidth,
    index * windowWidth,
    (index + 1) * windowWidth,
  ];

  const opacity = x.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  const scale = x.interpolate({
    inputRange,
    outputRange: [0.6, 0.8, 0.6],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      key={index}
      style={[styles.dots, {opacity, transform: [{scale}]}]}></Animated.View>
  );
};

export default Dots;

const styles = StyleSheet.create({
  dots: {
    width: 7,
    height: 7,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
  },
});
