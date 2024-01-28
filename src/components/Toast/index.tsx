import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, StyleSheet, Text} from 'react-native';
import {OptionProps, SHOW_TOAST_EVENT} from '../../utils/toast';
import {COLORS} from '../../utils/constants';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import SuccessIcon from '../../assets/images/svg/check-circle.svg';
import ErrorIcon from '../../assets/images/svg/error.svg';
import InfoIcon from '../../assets/images/svg/info.svg';

interface SnackBarProps {
  message: string;
  type: 'info' | 'success' | 'error';
}

const TOAST_ICON = {
  error: <ErrorIcon width={20} height={20} style={{marginRight: 2}} />,
  success: <SuccessIcon width={26} height={26} fill={COLORS.THEME_DARK_BLUE} />,
  info: <InfoIcon width={26} height={26} />,
};

const Toast = () => {
  const toastVisibility = useSharedValue(0);
  const [snackData, setSnackData] = useState<SnackBarProps>({
    message: '',
    type: 'info',
  });

  useEffect(() => {
    DeviceEventEmitter.addListener(
      SHOW_TOAST_EVENT,
      ({message, type, timeout}: OptionProps) => {
        setSnackData({
          message,
          type: type || 'info',
        });

        toastVisibility.value = withTiming(1, {}, () => {
          toastVisibility.value = withDelay(timeout || 5000, withTiming(0));
        });

        setTimeout(() => {
          setSnackData({
            message: '',
            type: 'info',
          });
        }, (timeout || 5000) + 1000);
      },
    );

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  const rstyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(toastVisibility.value, [0, 1], [0, 1]),
    };
  });

  return (
    snackData.message && (
      <Animated.View style={[styles.container, rstyles]}>
        {TOAST_ICON[snackData.type]}
        <Text style={styles.toast}>{snackData.message}</Text>
      </Animated.View>
    )
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '15%',
    zIndex: 999,
    backgroundColor: COLORS.NOTIFICATION,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  toast: {
    marginLeft: 3,
    color: COLORS.WHITE,
    fontSize: 13,
  },
});
