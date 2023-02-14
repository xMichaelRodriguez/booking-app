/* eslint-disable prettier/prettier */

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './App';

export const Main = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};
