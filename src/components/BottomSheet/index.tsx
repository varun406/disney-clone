import {
  Alert,
  Dimensions,
  Easing,
  LayoutChangeEvent,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Animated, {
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
  snapShot: number[];
}>;

const BottomSheet = ({
  open,
  setOpen,
  sheetHeight,
  snapShot,
}: BottomSheetProps) => {
  const {colors} = useTheme();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const initialHeight = useSharedValue(sheetHeight);
  const offset = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  const handleContentLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  useLayoutEffect(() => {
    initialHeight.value = contentHeight;
  }, [contentHeight]);

  const pan = Gesture.Pan().onChange(event => {
    const offsetDelta = offset.value + event.translationY;
    const MAX_OFFSET_DRAG = 10;
    const newHeight = initialHeight.value + offsetDelta;

    if (newHeight > 0) {
      initialHeight.value = newHeight;
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(offsetDelta);
    } else {
      offset.value = withSpring(0);
    }
  });

  const transformY = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  const handleSheetClose = () => {
    offset.value = withSpring(0, {}, () => {
      runOnJS(setOpen)(!open);
    });
  };

  return (
    <>
      <AnimatedPressable style={styles.backdrop} onPress={handleSheetClose}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.sheet, transformY]}>
            <View onLayout={handleContentLayout}>
              <Text>sdfdsfsdf</Text>
              <Text>sdfdsfsdf</Text>
              <Text>sdfdsfsdf</Text>
              <Text>sdfdsfsdf</Text>
              <Text>sdfdsfsdf</Text>
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#2C3B55',
  },
});
