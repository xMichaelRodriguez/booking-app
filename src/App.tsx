/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InitialScreen} from './screens/InitialScreen';
import {SignInScreen} from './screens/SignInScreen';
import {adaptNavigationTheme} from 'react-native-paper';
import {SingUpScreen} from './screens/SignUpScreen';
import {ResetPasswordScreen} from './screens/ResetPasswordScreen';
import {isSigned} from './constants/auth';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from './screens/dashboard/HomeScreen';
import {ServicesScreen} from './screens/dashboard/ServicesScreen';
const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Services" component={ServicesScreen} />
    </Drawer.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator initialRouteName="InitialScreen">
        {isSigned() ? (
          <DrawerComponent />
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
