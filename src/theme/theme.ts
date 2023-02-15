import {MD3LightTheme} from 'react-native-paper';

export const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#EE65B3',
    secondary: '#F10F91',
    tertiary: '#EA93C4',
  },
};
