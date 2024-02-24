import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import {SvgProps} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../utils/constants';

const {width} = Dimensions.get('window');

type DropdownProps = PropsWithChildren<{
  title: string;
  description?: string;
  LeftIcon: React.FC<SvgProps>;
  RightIcon: React.FC<SvgProps>;
  dropDownAction: () => void | undefined;
  actionList?: [
    {
      name: string;
      description?: string;
      icon: React.FC<SvgProps>;
    },
  ];
}>;

const Dropdown = ({
  title,
  description,
  LeftIcon,
  dropDownAction,
  actionList,
  RightIcon,
}: DropdownProps): React.JSX.Element => {
  const isOpen = new Animated.Value(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenDropdown = () => {
    setOpen(true);
    Animated.timing(isOpen, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const handleCloseDropdown = () => {
    setOpen(false);
    Animated.timing(isOpen, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const rotateNow = isOpen.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '180deg'],
  });

  // console.log('open', open);
  return (
    <View style={styles.dropDownContainer}>
      <Pressable
        onPress={() => {
          actionList
            ? open
              ? handleCloseDropdown()
              : handleOpenDropdown()
            : dropDownAction();
        }}>
        <View style={styles.dropDownWrap}>
          <LeftIcon
            width={25}
            height={25}
            stroke={COLORS.WHITE}
            strokeWidth={0.8}
            style={styles.dropDownLeftIcon}
          />
          <View style={styles.dropDownTitleSection}>
            <View>
              <Text style={[styles.dropDownTitle]}>{title}</Text>
              <Text style={styles.dropDownDescription}>{description}</Text>
            </View>
            <Animated.View
              style={{transform: [{rotate: actionList ? rotateNow : '0deg'}]}}>
              <RightIcon
                width={20}
                height={20}
                stroke={COLORS.WHITE}
                strokeWidth={0.8}
                rotation={actionList ? 90 : 0}
              />
            </Animated.View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropDownContainer: {
    // paddingHorizontal: 20,
  },
  dropDownWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  dropDownLeftIcon: {
    alignSelf: 'center',
  },
  dropDownTitleSection: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#ACCBE1',
    borderTopWidth: 0.2,
    paddingVertical: 15,
  },
  dropDownTitle: {
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  dropDownDescription: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    color: '#6c757d',
  },
});
