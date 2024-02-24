import {Animated, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/constants';
import Dots from './Dots';

type PaginationProps = {
  data: {
    background: string;
    logo: string;
  }[];
  x: Animated.Value;
};

const Pagination = ({data, x}: PaginationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.paginationWrap}>
        {data.map((_, index) => (
          <Dots key={index} index={index} x={x} />
        ))}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationWrap: {
    flexDirection: 'row',
    gap: 3,
  },
});
