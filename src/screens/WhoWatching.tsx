import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EditIcon from '../assets/images/svg/edit.svg';
import PlusIcon from '../assets/images/svg/plus.svg';
import {COLORS} from '../utils/constants';

const {width} = Dimensions.get('window');

const AVATAR_SIZE = width * 0.22;

const WhoWatching = () => {
  const navigation =
    useNavigation<NavigationProp<ReactNavigation.RootParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: COLORS.WHITE,
        fontSize: 18,
      },
    });
  }, []);

  const data = [
    {
      image:
        'https://cdn.pixabay.com/photo/2023/06/22/15/04/tourist-8081644_1280.png',
      name: 'Varun',
    },
    {
      image:
        'https://cdn.pixabay.com/photo/2023/06/22/15/04/tourist-8081644_1280.png',
      name: 'Kids',
    },
    {
      image: null,
      name: 'Add',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerCardWrap}>
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          data={data}
          numColumns={width >= 768 ? 3 : 2}
          renderItem={({item, index}) =>
            item.image ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('Tab')}
                key={index}
                hitSlop={50}
                activeOpacity={0.7}
                style={styles.userCard}>
                <Image
                  style={styles.userAvatar}
                  source={{
                    uri: item.image,
                  }}
                />
                <Text style={[{color: COLORS.WHITE}, styles.userName]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                hitSlop={50}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CreateProfile')}
                style={styles.addUserButton}>
                <PlusIcon width={50} height={50} fill="#fff" />
              </TouchableOpacity>
            )
          }
        />
      </View>
    </View>
  );
};

export default WhoWatching;

const styles = StyleSheet.create({
  editSection: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  editText: {
    color: '#6B86B3',
    fontWeight: '500',
    fontSize: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  containerCardWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flatListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  addUserButton: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    backgroundColor: '#1B2535',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
  },
  userName: {
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
});
