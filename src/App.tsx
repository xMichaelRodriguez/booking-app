/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InitialScreen} from './screens/InitialScreen';
import {SignInScreen} from './screens/SignInScreen';
import {ActivityIndicator} from 'react-native-paper';
import {SingUpScreen} from './screens/SignUpScreen';
import {DrawerComponent} from './components/DrawerComponent';
import {useAppDispatch, useAppSelector} from './hooks';
import {ResetPasswordScreen} from './screens/ResetPasswordScreen';
import {checkIsAuthenticated} from './store/slices/auth';
import {StyleSheet, useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from './theme/theme';
const Stack = createNativeStackNavigator();

function App() {
  const colorScheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    colorScheme === 'dark',
  );

  const {isSigned, isLoading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsDarkTheme(colorScheme === 'dark');
  }, [colorScheme]);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  useEffect(() => {
    dispatch(checkIsAuthenticated());
  }, [dispatch]);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={custom.activityStyle}
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    );
  }

  if (!isSigned) {
    return (
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="InitialScreen">
          <Stack.Group>
            <Stack.Screen
              name="Auth"
              component={InitialScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SingUpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          options={{headerShown: false}}
          component={DrawerComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const custom = StyleSheet.create({
  activityStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
