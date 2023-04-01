import {type Theme} from '@react-navigation/native';
import {DefaultTheme} from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EE65B3',
    secondary: '#F10F91',
    tertiary: '#EA93C4',
    subTitle: '#9E9E9E',
    background: '#fbfbfb',
    surface: '#282828',
  },
} as unknown as Theme;

export const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,

    primary: '#EE65B3',
    secondary: '#F10F91',
    tertiary: '#EA93C4',
    subTitle: '#9E9E9E',
    background: '#282828',
    surface: '#fff',
    text: '#fbfbfb',
  },
} as unknown as Theme;
