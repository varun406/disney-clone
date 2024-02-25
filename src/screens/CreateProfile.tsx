import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useLayoutEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckIcon from '../assets/images/svg/check.svg';
import {COLORS} from '../utils/constants';

const {width: windowWidth} = Dimensions.get('window');

const AVATAR_SIZE = windowWidth * 0.25;
const AVATAR_SPACING = (windowWidth - AVATAR_SIZE) / 2;

const CreateProfile = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  // ANIMATED SCROLL X

  const scrollX = useRef(new Animated.Value(0)).current;
  const avatarListRef = useRef<FlatList>(null);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: COLORS.WHITE,
        fontSize: 18,
      },
      headerBackImage: {
        tintColor: COLORS.WHITE,
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
      image:
        'https://cdn.pixabay.com/photo/2023/06/22/15/04/tourist-8081644_1280.png',
      name: 'Varun',
    },
    {
      image:
        'https://cdn.pixabay.com/photo/2023/06/22/15/04/tourist-8081644_1280.png',
      name: 'Kids',
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.avatarListContainer}>
          <Animated.FlatList
            ref={avatarListRef}
            horizontal
            bounces={false}
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            contentContainerStyle={styles.avatarList}
            snapToInterval={AVATAR_SIZE}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            data={data}
            renderItem={({item, index}) => {
              // TAKING INPUT RANGE FROM PREV MIDDLE AND NEXT
              const inputRange = [
                (index - 1) * AVATAR_SIZE,
                index * AVATAR_SIZE,
                (index + 1) * AVATAR_SIZE,
              ];

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7],
                extrapolate: 'clamp',
              });

              return (
                <AnimatedPressable
                  onPress={() => {
                    avatarListRef.current?.scrollToIndex({
                      index,
                      animated: true,
                      viewPosition: 0.5,
                    });
                  }}
                  style={[
                    {
                      width: AVATAR_SIZE,
                      opacity,
                      transform: [{scale}],
                    },
                  ]}>
                  <Animated.Image
                    key={index}
                    style={[styles.userAvatar]}
                    source={{uri: item.image}}
                  />
                </AnimatedPressable>
              );
            }}
          />
          {/* AVATAR RING */}
          <View style={styles.avatarRing} />
        </View>
        <View style={styles.yourNameWrap}>
          <TextInput
            style={[{color: COLORS.WHITE}, styles.yourName]}
            placeholder="Your Name"
            placeholderTextColor={COLORS.WHITE}
            cursorColor={COLORS.WHITE}
          />
        </View>
      </View>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <TouchableOpacity
          onPress={() => console.log('Press')}
          activeOpacity={0.8}
          style={[styles.doneEditingButton, {backgroundColor: colors.primary}]}>
          <CheckIcon width={30} height={30} stroke={COLORS.WHITE} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BACKGROUND,
  },
  avatarListContainer: {
    position: 'relative',
    marginTop: 20,
  },
  avatarList: {
    paddingHorizontal: AVATAR_SPACING,
  },
  avatarRing: {
    position: 'absolute',
    left: windowWidth / 2 - AVATAR_SIZE / 2,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    backgroundColor: 'transparent',
    borderRadius: AVATAR_SIZE,
    borderColor: '#fff',
    borderWidth: 5,
  },
  userAvatar: {
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
  },
  yourNameWrap: {
    marginHorizontal: 20,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourName: {
    width: windowWidth * 0.7,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    borderColor: '#929699',
    borderWidth: 2,
    borderRadius: 9,
  },
  keyboardAvoidingView: {
    paddingVertical: 20,
    paddingRight: 10,
  },
  doneEditingButton: {
    marginLeft: 'auto',
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
