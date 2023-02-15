import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ServicesScreen} from '../screens/dashboard/ServicesScreen';
import {HomeScreen} from '../screens/dashboard/HomeScreen';
import {BookingScreen} from '../screens/dashboard/BookingScreen';
import {theme} from '../theme/theme';
import {DrawerMenu} from './DrawerMenu';

const Drawer = createDrawerNavigator();

export const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => DrawerMenu({props})}
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          color: 'white',
        },

        drawerActiveTintColor: theme.colors.primary,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Services" component={ServicesScreen} />
      <Drawer.Screen name="Bookings" component={BookingScreen} />
    </Drawer.Navigator>
  );
};
