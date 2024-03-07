import {
  Alert,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Animated, {
  SlideInUp,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {width, height: WindowHeight} = Dimensions.get('window');

type BottomSheetProps = PropsWithChildren<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sheetHeight: number;
  adaptable?: boolean;
}>;

const BottomSheet = ({
  open,
  setOpen,
  sheetHeight,
  adaptable = false,
}: BottomSheetProps) => {
  const {colors} = useTheme();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const childrenRef = useSharedValue(0);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  console.log('layoutHeight', layoutHeight);

  //NOTE: HEIGHT
  const height = useSharedValue<number>(0);
  const heightStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  useLayoutEffect(() => {
    height.value = withDelay(
      100,
      withSpring(sheetHeight, {
        damping: 15,
      }),
    );
  }, []);

  const handleSheetClose = () => {
    height.value = withTiming(0, {}, () => {
      runOnJS(setOpen)(!open);
    });
  };

  const backdropAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(
      height.value,
      [0, Math.max(100, height.value)],
      [0, 1],
    ),
  }));

  //NOTE: OFFSET
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange(event => {
      const offsetDelta = offset.value + event.changeY;
      const MAX_OFFSET_DRAG = 10;
      const clamp = Math.max(-MAX_OFFSET_DRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(event => {
      if (offset.value < (adaptable ? layoutHeight : sheetHeight) / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = event.translationY;
        runOnJS(handleSheetClose)();
      }
    });

  const transformY = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });

  // NOTE: GET CHILDREN HEIGHT
  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    setLayoutHeight(height);
  };

  useEffect(() => {
    // You can access the layoutHeight here when the bottom sheet opens
    console.log('Layout Height:', layoutHeight);
  }, [layoutHeight]);

  return (
    <>
      <AnimatedPressable
        style={[styles.backdrop, backdropAnimation]}
        onPress={handleSheetClose}>
        <GestureDetector gesture={pan}>
          <Animated.View
            onLayout={onLayout}
            style={[styles.sheet, !adaptable && heightStyle, transformY]}>
            <TouchableOpacity>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            </TouchableOpacity>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <ScrollView>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
              <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            </ScrollView>
            {/* <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text>
            <Text style={[{color: colors.text}]}>sdfdsfsd</Text> */}
          </Animated.View>
        </GestureDetector>
      </AnimatedPressable>
    </>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    height: WindowHeight,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    marginTop: 'auto',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#2C3B55',
  },
});
