import React from 'react';
import {MD3LightTheme, Provider as PaperProvider} from 'react-native-paper';

import App from './src/App';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  // colors: {
  //   ...MD3LightTheme.colors,
  //   primary: '#3498db',
  //   secondary: '#f1c40f',
  //   tertiary: '#a1b2c3',
  // },
};
export const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};
