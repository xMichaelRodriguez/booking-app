import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import App from './src/App';
import {store} from './src/store';
import {theme} from './src/theme/theme';

export const Main = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
};
