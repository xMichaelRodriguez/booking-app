/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ServicesScreen} from '../screens/dashboard/ServicesScreen';
import {HomeScreen} from '../screens/dashboard/HomeScreen';
import {BookingScreen} from '../screens/dashboard/BookingScreen';
import {theme} from '../theme/theme';
import {DrawerMenu} from './DrawerMenu';
import {ServiceItem} from '../screens/dashboard/ServiceItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconButton} from 'react-native-paper';
import {BookingItemList} from '../screens/dashboard/BookingItemList';
import {CreateService} from './list/CreateService';
const Drawer = createDrawerNavigator();

export const DrawerComponent = ({navigation}: {navigation: any}) => {
  const handleGoBack = (subScreen: string) => {
    navigation.replace('Root', {screen: subScreen});
  };
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

      <Drawer.Screen
        name="ServiceItem"
        options={{
          title: 'Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => handleGoBack('Services')}>
              <IconButton icon="chevron-left" />
            </TouchableOpacity>
          ),

          drawerItemStyle: {
            display: 'none',
          },
        }}
        component={ServiceItem}
      />
      <Drawer.Screen
        name="NewService"
        component={CreateService}
        options={{
          title: 'Create Service',
        }}
      />
      <Drawer.Screen name="Bookings" component={BookingScreen} />
      <Drawer.Screen
        name="BookingItem"
        options={{
          title: 'Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => handleGoBack('Bookings')}>
              <IconButton icon="chevron-left" />
            </TouchableOpacity>
          ),
          drawerItemStyle: {
            display: 'none',
          },
        }}
        component={BookingItemList}
      />
    </Drawer.Navigator>
  );
};
