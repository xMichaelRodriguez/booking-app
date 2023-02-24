/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InitialScreen} from './screens/InitialScreen';
import {SignInScreen} from './screens/SignInScreen';
import {adaptNavigationTheme, ActivityIndicator} from 'react-native-paper';
import {SingUpScreen} from './screens/SignUpScreen';
import {DrawerComponent} from './components/DrawerComponent';
import {useAppDispatch, useAppSelector} from './hooks';
import {ResetPasswordScreen} from './screens/ResetPasswordScreen';
import {checkIsAuthenticated} from './store/slices/auth';
import {StyleSheet} from 'react-native';
import {theme} from './theme/theme';
const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});
const Stack = createNativeStackNavigator();

function App() {
  const {isSigned, isLoading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

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
      <NavigationContainer theme={LightTheme}>
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
    <NavigationContainer theme={LightTheme}>
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
