import {DeviceEventEmitter} from 'react-native';

export interface OptionProps {
  message: string;
  timeout?: number;
  type?: 'info' | 'success' | 'error';
}

export const SHOW_TOAST_EVENT = 'showToast';

export const toast = {
  info: (options: OptionProps) => {
    DeviceEventEmitter.emit(SHOW_TOAST_EVENT, {...options, type: 'info'});
  },
  success: (options: OptionProps) => {
    DeviceEventEmitter.emit(SHOW_TOAST_EVENT, {...options, type: 'success'});
  },
  error: (options: OptionProps) => {
    DeviceEventEmitter.emit(SHOW_TOAST_EVENT, {...options, type: 'error'});
  },
};
