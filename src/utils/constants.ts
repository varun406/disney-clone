import {Theme} from '@react-navigation/native';

interface ColorProps {
  BACKGROUND: string;
  HIGHLIGHT_COLOR: string;
  NOTIFICATION: string;
  WHITE: string;
  THEME_BLUE: string;
  THEME_DARK_BLUE: string;
  THEME_BLACK: string;
}

export const MyTheme: Theme = {
  dark: false,
  colors: {
    primary: '#0957E0',
    background: '#0B0F15',
    card: '#5E6F8C',
    text: '#FFFFFF',
    border: '#B3CEFC',
    notification: '#4C6793',
  },
};

export const COLORS: ColorProps = {
  THEME_BLACK: '#000000',
  BACKGROUND: '#0B0F15',
  HIGHLIGHT_COLOR: '#4C6793',
  NOTIFICATION: '#031241',
  WHITE: '#FFFFFF',
  THEME_BLUE: '#0957E0',
  THEME_DARK_BLUE: '#062A98',
};
