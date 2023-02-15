import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ServicesScreen} from '../screens/dashboard/ServicesScreen';
import {HomeScreen} from '../screens/dashboard/HomeScreen';

const Drawer = createDrawerNavigator();

export const DrawerComponent = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Services" component={ServicesScreen} />
    </Drawer.Navigator>
  );
};
