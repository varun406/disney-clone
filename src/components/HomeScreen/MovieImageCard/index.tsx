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
};

const MovieImageCard = ({img}: MovieImageCardProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Detail')}
      style={styles.imageWrapper}>
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
    width: windowWidth * 0.31,
    height: windowHeight * 0.2,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 4,
  },
});
