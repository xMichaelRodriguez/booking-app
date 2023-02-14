/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen} from './screens/DetailsScreen';
import {InitialScreen} from './screens/InitialScreen';
import {SignInScreen} from './screens/SignInScreen';
import {adaptNavigationTheme} from 'react-native-paper';
import {SingUpScreen} from './screens/SignUpScreen';
const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen name="Auth" component={InitialScreen} />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{title: 'SignIn'}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="SignUp" component={SingUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
