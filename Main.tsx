import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import App from './src/App';
import {store} from './src/store';
import {darkTheme, lightTheme} from './src/theme/theme';

export const Main = () => {
  const colorScheme = useColorScheme();

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    colorScheme === 'dark',
  );

  useEffect(() => {
    setIsDarkTheme(colorScheme === 'dark');
  }, [colorScheme]);

  const theme = isDarkTheme ? darkTheme : lightTheme;
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
};
