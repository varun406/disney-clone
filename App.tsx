/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import {COLORS, MyTheme} from './src/utils/constants';
import BottomSheet from './src/components/BottomSheet';
import BottomSheetProvider from './src/context/BottomSheetProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNetInfo, addEventListener} from '@react-native-community/netinfo';
import Animated, {
  SlideInDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Toast from './src/components/Toast';

function App(): React.JSX.Element {
  const indicator = useSharedValue(0);
  const [isConnected, setConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      indicator.value = state.isConnected
        ? withTiming(1, {}, () => {
            indicator.value = withDelay(3000, withTiming(0, {duration: 500}));
          })
        : withTiming(1);
      setConnected(state.isConnected);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  const indicatorStyle = useAnimatedStyle(() => ({
    paddingVertical: interpolate(indicator.value, [0, 1], [0, 5]),
    height: interpolate(indicator.value, [0, 1], [0, 30]),
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.Text
        style={[
          isConnected
            ? styles.connectedNetworkIndicator
            : styles.disconnectedNetworkIndicator,
          indicatorStyle,
        ]}>
        {isConnected ? 'Connected' : 'You`re offline. Check your connection.'}
      </Animated.Text>
      <Toast />
      <SafeAreaProvider>
        <BottomSheetProvider>
          <NavigationContainer>
            <StatusBar backgroundColor={'#021330'} barStyle={'light-content'} />
            <StackNavigator />
          </NavigationContainer>
        </BottomSheetProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 9,
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  connectedNetworkIndicator: {
    // paddingVertical: 5,
    backgroundColor: 'green',
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  disconnectedNetworkIndicator: {
    // paddingVertical: 5,
    backgroundColor: 'red',
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});
