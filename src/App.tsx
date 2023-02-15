/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InitialScreen} from './screens/InitialScreen';
import {SignInScreen} from './screens/SignInScreen';
import {adaptNavigationTheme} from 'react-native-paper';
import {SingUpScreen} from './screens/SignUpScreen';
import {ResetPasswordScreen} from './screens/ResetPasswordScreen';
import {isSigned} from './constants/auth';
import {DrawerComponent} from './components/DrawerComponent';
const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});
const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    console.log(isSigned());
  }, []);
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator initialRouteName="InitialScreen">
        {isSigned(true) ? (
          <Stack.Screen
            name="DrawerScreen"
            options={{headerShown: false}}
            component={DrawerComponent}
          />
        ) : (
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
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
