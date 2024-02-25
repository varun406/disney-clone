import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type MovieImageCardProps = {
  img: string;
  autoHeight?: boolean;
};

const MovieImageCard = ({img, autoHeight}: MovieImageCardProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Detail')}
      style={[
        styles.imageWrapper,
        {height: autoHeight ? 'auto' : windowHeight * 0.17},
      ]}>
      <Image
        style={styles.image}
        source={{
          uri: img,
        }}
      />
    </Pressable>
  );
};

export default MovieImageCard;

const styles = StyleSheet.create({
  imageWrapper: {
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 3 / 3.8,
    borderRadius: 4,
  },
});
