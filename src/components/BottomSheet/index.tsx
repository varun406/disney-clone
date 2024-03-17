import {
  Alert,
  DimensionValue,
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
  Children,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Animated, {
  BounceInDown,
  BounceInUp,
  FadeIn,
  FadeOut,
  ReduceMotion,
  SlideInDown,
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
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sheetHeight: number;
  adaptable?: boolean;
}>;

const BottomSheet = ({
  children,
  open,
  setOpen,
  sheetHeight,
  adaptable = false,
}: BottomSheetProps) => {
  const {colors} = useTheme();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  //NOTE: HEIGHT
  const height = useSharedValue<DimensionValue>(adaptable ? 'auto' : 0);
  const heightStyle = useAnimatedStyle(() => ({
    height: adaptable ? 'auto' : height.value,
  }));

  useLayoutEffect(() => {
    height.value = withDelay(
      50,
      withSpring(adaptable ? 'auto' : sheetHeight, {
        damping: 15,
      }),
    );
  }, []);

  const backdropAnimation = useAnimatedStyle(() => ({
    opacity: typeof height.value === 'string' ? withTiming(1) : withTiming(0),
  }));

  //NOTE: OFFSET
  const offset = useSharedValue(0);

  const handleSheetClose = () => {
    console.log('closed sheet');

    height.value = withTiming(0, {}, () => {
      // CLOSING ADAPTABLE BOTTOMSHEET
      if (adaptable) {
        offset.value = withTiming(layoutHeight, {}, () => {
          runOnJS(setOpen)(!open);
        });
      } else {
        runOnJS(setOpen)(!open);
      }
    });
  };

  const pan = Gesture.Pan()
    .onChange(event => {
      const offsetDelta = offset.value + event.changeY;
      const MAX_OFFSET_DRAG = 10;
      const clamp = Math.max(-MAX_OFFSET_DRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(event => {
      if (offset.value < (adaptable ? layoutHeight / 3 : sheetHeight) / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(adaptable ? layoutHeight : sheetHeight);
        // offset.value = event.translationY;
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

  return (
    <>
      <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.backdrop]}
        onPress={handleSheetClose}>
        <AnimatedPressable
          entering={
            adaptable
              ? BounceInDown.duration(1000).reduceMotion(ReduceMotion.Never)
              : undefined
          }
          style={styles.insidePressable}
          onPress={() => console.log('noting')}>
          <GestureDetector gesture={pan}>
            {/* <Animated.View
              onLayout={onLayout}
              style={[styles.sheet, heightStyle, transformY]}>
              {children}
            </Animated.View> */}
            <Animated.View
              onLayout={onLayout}
              style={[styles.sheet, heightStyle, transformY]}>
              {children}
            </Animated.View>
          </GestureDetector>
        </AnimatedPressable>
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
  insidePressable: {
    marginTop: 'auto',
  },
  sheet: {
    marginTop: 'auto',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#2C3B55',
  },
});
