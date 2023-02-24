/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ServicesScreen} from '../screens/dashboard/services/ServicesScreen';
import {HomeScreen} from '../screens/dashboard/HomeScreen';
import {BookingScreen} from '../screens/dashboard/booking/BookingScreen';
import {theme} from '../theme/theme';
import {DrawerMenu} from './DrawerMenu';
import {ServiceItem} from '../screens/dashboard/services/components/ServiceItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconButton} from 'react-native-paper';
import {BookingItemList} from '../screens/dashboard/booking/BookingItemList';
import {CreateService} from '../screens/dashboard/services/components/CreateService';

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
      <Drawer.Group>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({size}) => (
              <IconButton icon="home-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            drawerIcon: ({size}) => (
              <IconButton icon="store-cog-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            drawerIcon: ({size}) => (
              <IconButton icon="calendar-clock-outline" size={size} />
            ),
          }}
        />
      </Drawer.Group>

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
          drawerItemStyle: {
            display: 'none',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => handleGoBack('Services')}>
              <IconButton icon="chevron-left" />
            </TouchableOpacity>
          ),
        }}
      />

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
